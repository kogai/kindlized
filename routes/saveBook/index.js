var Q 		= require( 'q' );
var express = require('express');
var router 	= express.Router();

var isNewBook 			= require('routes/saveBook/lib/isNewBook');
var saveBookList 		= require('routes/saveBook/lib/saveBookList');
var saveUserBookList = require('routes/saveBook/lib/saveUserBookList');

router.post( '/', function( req, res ){
	var newBook	= req.body.newBook;
	Q.when({
		req: req,
		res: res,
		newBook: newBook
	})
	.then( isNewBook )
	.then( saveBookList )
	.then( saveUserBookList )
	.done( function(){
		res.send({
		   newBook: newBook
		});
	});
});

module.exports = router;
