var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelAuthor 	= require( '../../author/lib/modelAuthor' );
var modelBookList = require( '../../shelf/lib/modelBookList' );
var constant 		= require('common/constant')

var fetchBookList = function(){
	var d = Q.defer();
	var bookList = modelBookList.find( {}, function( err, books ){
		d.resolve( books );
	});
	return d.promise;
};

var renderRouter = function( books ){
	var d = Q.defer();
	router.get('/', function(req, res) {
        res.send( books );
		d.resolve( books );
	});
	return d.promise;
}

fetchBookList()
.then( renderRouter )
.done( function( books ){
	console.log( 'books router fetched ', books.length );
});

module.exports = router;
