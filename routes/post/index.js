var Q 				= require('q');
var express	 		= require('express');
var router	  		= express.Router();
var modelBookList 	= require( '../../shelf/lib/modelBookList' );

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

	modelBookList.find( { title: titleQuery }, function( err, bookListDB ){
		var countBooks = bookListDB.length;
		var isRegisterdBook = false;
		if( countBooks > 0 ){
			isRegisterdBook = true;
		}
		data.isRegisterdBook 	= isRegisterdBook;
		data.newBook 			= newBook;
		data.bookListDB			= bookListDB;
		d.resolve( data );
	});
	return d.promise;
};

var fetchBookListAmazon = function( data ){
	var d = Q.defer();
	var newBook = data.newBook;
	var existenceAuthorExpression = new makeExistenceExpression( newBook );
    opExistenceBook.execute( 'ItemLookup', existenceAuthorExpression,  function( err, bookListAmazon ){
		try{
			console.log( 'bookListAmazon', bookListAmazon.ItemLookupResponse.Items[0].Request[0].Errors );
		}catch( err ){

		}finally{

		}
		data.bookListAmazon = bookListAmazon;
		d.resolve( data );
    });
	return d.promise;
};

var sendResponse = function( data ){
	var d = Q.defer();
	var res = data.res;
	res.send({
		bookListDB			: data.bookListDB,
		bookListAmazon		: data.bookListAmazon,
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
		console.log('post routes completed.');
	});
});

module.exports = router;
