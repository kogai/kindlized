var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var reduceBookInUser 	= require( 'routes/reduce/lib/reduceBookInUser' );

router.post( '/', function( req, res ) {
	'use strict';
	reduceBookInUser( req, res );
});

module.exports = router;
