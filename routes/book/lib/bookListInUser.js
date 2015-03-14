var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelUser     = require( 'user/lib/modelUser' );
var modelBookList = require( 'shelf/lib/modelBookList' );
var constant 		= require( 'common/constant' )

var fetchModelUser = function( req, res ){
	var d = Q.defer();
	modelUser.findOne( { _id: constant._id }, function( err, user ){
		d.resolve({
			user: user,
			req: req,
			res: res
		});
	});
	return d.promise;
};

var fetchBookList = function( data ){
   var userBookList = data.user.bookList;
	var d = Q.defer();
	modelBookList.find( { _id: { $in: userBookList } }, function( err, books ){
      data.books = books;
		d.resolve( data );
	});
	return d.promise;
};

var renderRouter = function( data ){
	var books  = data.books;
	var res    = data.res;
	var d      = Q.defer();

	res.send( books );
	d.resolve( books );

	return d.promise;
}

module.exports = function( req, res ){
	fetchModelUser( req, res )
	.then( fetchBookList )
	.then( renderRouter )
	.done( function( books ){
		console.log( 'user books router fetched ', books.length );
	});
};
