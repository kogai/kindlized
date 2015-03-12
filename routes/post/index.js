var Q 				= require('q');
var express	 		= require('express');
var router	  		= express.Router();
var modelBookList 	= require( '../../shelf/lib/modelBookList' );
var constant 		= require( '../../common/constant' );

var opHelper				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../common/makeOpConfig' );
var makeExistenceExpression	= require( './lib/makeExistenceExpression' );

var opConfig 					= new makeOpConfig();
var opExistenceBook 			= new opHelper( opConfig );

var fetchBookListDB = function( data ){
	var d = Q.defer();

	var req 		= data.req;
	var newBook		= req.body.newBook;
	var titleQuery 	= new RegExp( newBook );

	modelBookList.find( { title: titleQuery }, function( err, bookListInDB ){
		var countBooks = bookListInDB.length;
		var isRegisterdBook = false;
		if( countBooks > 0 ){
			isRegisterdBook = true;
		}
		data.isRegisterdBook 	= isRegisterdBook;
		data.newBook 			= newBook;
		data.bookListInDB		= bookListInDB;
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

router.post( '/', function( req, res ) {
	Q.when({
		res : res,
		req : req
	})
	.then( fetchBookListDB )
	.then( fetchBookListAmazon )
	.then( sendResponse )
	.done( function(){
		console.log('Server-side search books process is completed.');
	});
});

module.exports = router;
