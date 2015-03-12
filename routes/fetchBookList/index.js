var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelAuthor 	= require( '../../author/lib/modelAuthor' );
var modelBookList 	= require( '../../shelf/lib/modelBookList' );

var fetchBookList = function(){
	var d = Q.defer();
	var bookList = modelBookList.find( { isKindlized: true }, function( err, books ){
		d.resolve( books );
	});
	return d.promise;
};

var renderRouter = function( books ){
	var d = Q.defer();
	console.log( books.length );
	router.get('/', function(req, res) {
        res.send( books );
		d.resolve();
	});
	return d.promise;
}

fetchBookList()
.then( renderRouter )
.done( function(){
	console.log( 'books router complete.' );
});

module.exports = router;
