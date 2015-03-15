var Q 				= require('q');
var _ 				= require('underscore');
var express	 		= require('express');
var moment 			= require('moment-timezone');
var router	  		= express.Router();
var modelBookList 	= require( 'shelf/lib/modelBookList' );
var modelAuthor 	= require( 'author/lib/modelAuthor' );
var constant 		= require( 'common/constant' );

var opHelper				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( 'common/makeOpConfig' );
var makeExistenceExpression	= require( 'routes/search/lib/makeExistenceExpression' );

var opConfig 		= new makeOpConfig();
var opExistenceBook = new opHelper( opConfig );

module.exports = function( data ){
	var d = Q.defer();
    var authorListInAmazon = data.authorListInAmazon;
	var authorsStore = [];
	for (var i = 0; i < authorListInAmazon.length; i++) {
		var authors = authorListInAmazon[i];
		authorsStore = authorsStore.concat( authors );
	}
	for (var i = 0; i < authorsStore.length; i++) {
		var authors = authorsStore[i];
		saveAuthor( authors );
		if( i === authorListInAmazon.length - 1 ) d.resolve( data );
	}
	return d.promise;
};

var saveAuthor = function( author ){
	modelAuthor.findOne( { name: author }, function( err, authorInDB ){
		if( !authorInDB ){

			var currentDay = new Date();
			currentDay.setDate( currentDay.getDate() - 30 );
			var initialModifiedTime = moment( currentDay );

			var newAuthor = new modelAuthor({
					name: author,
					lastModified: initialModifiedTime
			});
			newAuthor.save( function(err){
				if(err) console.log(err);
				console.log( author, 'regist is success' );
			});
		}
	});
};
