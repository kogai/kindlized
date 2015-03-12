var Q 				= require('q');
var _ 				= require('underscore');
var express	 		= require('express');
var router	  		= express.Router();
var modelBookList 	= require( '../../shelf/lib/modelBookList' );
var modelAuthor 	= require( '../../author/lib/modelAuthor' );
var constant 		= require( '../../common/constant' );

var opHelper				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../common/makeOpConfig' );
var makeExistenceExpression	= require( './lib/makeExistenceExpression' );

var opConfig 		= new makeOpConfig();
var opExistenceBook = new opHelper( opConfig );

var fetchBookListDB = function( data ){
	var d = Q.defer();

	var req 		= data.req;
	var newBook		= req.body.newBook;
	var titleQuery 	= new RegExp( newBook );

	modelBookList.find( { title: titleQuery }, function( err, bookListInDB ){
		if( err ) throw err;

		var countBooks = bookListInDB.length;
		data.isNewBook 	= false;
		if( countBooks === 0 ){
			data.isNewBook 	= true;
		}

		data.newBook 		= newBook;
		data.titleQuery 	= titleQuery;
		data.bookListInDB	= bookListInDB;
		d.resolve( data );
	});
	return d.promise;
};

var fetchBookListAmazon = function( data ){
	var d = Q.defer();
	var newBook = data.newBook;
	var existenceAuthorExpression = new makeExistenceExpression( newBook );

	var recursionOpExistenceBook = function(){
		opExistenceBook.execute( 'ItemLookup', existenceAuthorExpression,  function( err, bookListInAmazon ){
			try{
				console.log( 'bookListInAmazon', bookListInAmazon.ItemLookupResponse.Items[0].Request[0].Errors );
			}catch( err ){
				setTimeout( function(){
					recursionOpExistenceBook();
				}, constant.interval );
			}finally{
				// if isNewAuthor
				// 新規に著者を登録

				// if( 取得に成功 || 書籍が存在しない ){
					data.bookListInAmazon = bookListInAmazon;
					d.resolve( data );
				// }
			}
	    });
	};
	recursionOpExistenceBook();
	return d.promise;
};

var sendResponse = function( data ){
	var d = Q.defer();
	var res = data.res;
	res.send({
		bookListInDB		: data.bookListInDB,
		bookListInAmazon	: data.bookListInAmazon,
		showSuggestedBooks 	: true
	});
	d.resolve( data );
	return d.promise;
};

var fetchAuthorListDB = function( data ){
	var d = Q.defer();

	var bookListInDB 			= data.bookListInDB;
	var authorsRelatedWithBook 	= [];

	for (var i = 0; i < bookListInDB.length; i++) {
		var authorName = bookListInDB[i].author;
		for (var j = 0; j < authorName.length; j++) {
			authorsRelatedWithBook.push( authorName[j] );
		}
	}

	authorsRelatedWithBook = _.uniq( authorsRelatedWithBook );
	modelAuthor.find( { name: { $in: authorsRelatedWithBook } }, function( err, authorsRelatedWithBookInDB ){
		if( err ) throw err;
		data.authorsRelatedWithBook 	= authorsRelatedWithBook;
		data.authorsRelatedWithBookInDB = authorsRelatedWithBookInDB;

		var countAuthors = authorsRelatedWithBookInDB.length;
		data.isNewAuthor = false;
		if( countAuthors === 0 ){
			data.isNewAuthor = true;
		}

		d.resolve( data );
	});
	return d.promise;
};

router.post( '/', function( req, res ) {
	Q.when({
		res : res,
		req : req
	})
	.then( fetchBookListDB )
	.then( fetchBookListAmazon )
	.then( sendResponse )
	.then( fetchAuthorListDB )
	.done( function(){
		console.log('Server-side search books process is completed.');
	});
});

module.exports = router;
