var Q 						= require('q');
var _ 						= require('underscore');
var express	 			= require('express');
var router	  		= express.Router();

var modelBookList = require( 'shelf/lib/modelBookList' );
var modelAuthor 	= require( 'author/lib/modelAuthor' );
var constant 			= require( 'common/constant' );

var opHelper								= require( 'apac' ).OperationHelper;
var makeOpConfig 						= require( 'common/makeOpConfig' );

var makeExistenceExpression	= require( 'routes/search/lib/makeExistenceExpression' );
var fetchBookListDB					= require( 'routes/search/lib/fetchBookListDB' );
var sendResponseInDB				= require( 'routes/search/lib/sendResponseInDB' );

var fetchBookListAmazon				= require( 'routes/search/lib/fetchBookListAmazon' );
var handleBookListFromAmazon 	= require( 'routes/search/lib/handleBookListFromAmazon' );
var sendResponseInAmazon			= require( 'routes/search/lib/sendResponseInAmazon' );
var saveBookListToDB 					= require( 'routes/search/lib/saveBookListToDB' );
var fetchBookListFromAmazon 	= require( 'routes/search/lib/fetchBookListFromAmazon' );
var fetchAuthorListAmazon			= require( 'routes/search/lib/fetchAuthorListAmazon' );
var saveNewAuthor							= require( 'routes/search/lib/saveNewAuthor' );

var opConfig 				= new makeOpConfig();
var opExistenceBook = new opHelper( opConfig );

router.post( '/db', function( req, res ) {
	Q.when({
		res : res,
		req : req
	})
	.then( fetchBookListDB )
	.then( sendResponseInDB )
	.done( function( data ){
		console.log('DB内の検索処理完了.');
	});
});

router.post( '/amazon', function( req, res ) {
	Q.when({
		res : res,
		req : req
	})
	.then( fetchBookListAmazon )
	.then( handleBookListFromAmazon )
	.then( saveBookListToDB )
	.then( sendResponseInAmazon )
	.then( fetchBookListFromAmazon )
	.then( fetchAuthorListAmazon )
	.then( saveNewAuthor )
	.done( function( data ){
		console.log( 'data.bookListInAmazon', data.bookListInAmazon );
		console.log('AmazonAPIの検索処理完了.');
	});
});

module.exports = router;
