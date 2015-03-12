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
    var authorListInAmazon = data.authorListInAmazon;

	for (var i = 0; i < authorListInAmazon.length; i++) {
		var author = authorListInAmazon[i];
		saveAuthor( author );
		if( i === authorListInAmazon.length - 1 ) d.resolve( data );
	}
	return d.promise;
};

var saveAuthor = function( author ){
	modelAuthor.findOne( { name: author }, function( err, authorInDB ){
		if( !authorInDB ){
			var newAuthor = new modelAuthor({
                name: author
			});
			newAuthor.save( function(err){
				if(err) console.log(err);
				console.log( author, 'regist is success' );
			});
		}
	});
};
