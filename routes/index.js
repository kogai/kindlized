var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelAuthor 	= require( '../author/lib/modelAuthor' );
var modelBookList 	= require( '../shelf/lib/modelBookList' );

var fetchAuthorList = function( authorsAndBooks ){
	var d = Q.defer();
	var authorList 	= modelAuthor.find( {}, function( err, authors ){
		authorsAndBooks.authors = authors;
		d.resolve( authorsAndBooks );
	});
	return d.promise;
};

var fetchBookList = function( authorsAndBooks ){
	var d = Q.defer();
	var bookList 	= modelBookList.find( {}, function( err, books ){
		authorsAndBooks.books = books;
		d.resolve( authorsAndBooks );
	});
	return d.promise;
};

var renderRouter = function( authorsAndBooks ){
	var d = Q.defer();

	router.get('/', function(req, res) {
		res.render('index', {
			title : 'home',
			authors: authorsAndBooks.authors,
			books: authorsAndBooks.books
		});
		d.resolve();
	});
	return d.promise;
}

Q.when( {} )
.then( fetchAuthorList )
.then( fetchBookList )
.then( renderRouter )
.done( function(){
	console.log( 'router complete.' );
});

module.exports = router;
