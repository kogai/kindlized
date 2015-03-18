var Q 						= require( 'q' );
var express 			= require('express');
var router 				= express.Router();
var modelBookList = require( 'shelf/lib/modelBookList' );
var constant 			= require( 'common/constant' );

var fetchBookList = function( req, res ){
	var d = Q.defer();
	modelBookList.find( {}, function( err, books ){
		d.resolve({
			books: books,
			req: req,
			res: res
		});
	});
	return d.promise;
};

var renderRouter = function( data ){
	var books = data.books;
	var res 	= data.res;
	var d 		= Q.defer();

	res.send( books );
	d.resolve( books );

	return d.promise;
};

module.exports = function( req, res ){
	fetchBookList( req, res )
	.then( renderRouter )
	.done( function( books ){
		console.log( 'books router fetched ', books.length );
	});
};
