var Q 				= require('q');
var _ 				= require('underscore');
var express	 		= require('express');
var router	  		= express.Router();
var modelBookList 	= require( '../../../../shelf/lib/modelBookList' );
var modelAuthor 	= require( '../../../../author/lib/modelAuthor' );
var constant 		= require( '../../../../common/constant' );

var opHelper				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../../../common/makeOpConfig' );
var makeExistenceExpression	= require( '../makeExistenceExpression' );

var opConfig 		= new makeOpConfig();
var opExistenceBook = new opHelper( opConfig );

module.exports = function( data ){
	var d = Q.defer();

	var bookListInAmazon 	= data.bookListInAmazon;
	var authorListInAmazon 	= [];

	for (var i = 0; i < bookListInAmazon.length; i++) {
		var author = bookListInAmazon[i].ItemAttributes[0].Author;
		authorListInAmazon.push( author );
	}
	authorListInAmazon = _.uniq( authorListInAmazon );

	data.authorListInAmazon = authorListInAmazon;
	d.resolve( data );

	return d.promise;
};
