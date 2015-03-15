var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var bookListInDB 	= require( 'routes/book/lib/bookListInDB' );
var bookListInUser 	= require( 'routes/book/lib/bookListInUser' );
var bookListWithSearch 	= require( 'routes/book/lib/bookListWithSearch' );

router.get('/search', function( req, res ) {
	bookListWithSearch( req, res );
});

router.get('/user', function( req, res ) {
	bookListInUser( req, res );
});

router.get('/', function( req, res ) {
	bookListInDB( req, res );
});

module.exports = router;
