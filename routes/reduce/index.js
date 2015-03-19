var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var bookListInDB 	= require( 'routes/reduce/lib/reduceBookInUser' );

router.post( '/', function( req, res ) {
	console.log('===reduce...');
	bookListInDB( req, res );
});

module.exports = router;
