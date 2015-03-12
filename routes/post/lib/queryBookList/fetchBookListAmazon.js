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
	var newBook = data.newBook;
	var existenceAuthorExpression = new makeExistenceExpression( newBook );
	var intervalTimeIncrements = 0;
	var recursionOpExistenceBook = function(){
		opExistenceBook.execute( 'ItemSearch', existenceAuthorExpression,  function( err, res ){
			if( err ) throw err;
			var bookListInAmazon;
			try{
				bookListInAmazon = res.ItemSearchResponse.Items[0].Item;
			}catch( err ){
				console.log( err );
				intervalTimeIncrements++;
				setTimeout( function(){
					console.log('retry');
					recursionOpExistenceBook();
				}, constant.interval * intervalTimeIncrements );
			}finally{
				if( bookListInAmazon === undefined ){
					data.bookListInAmazon = [];
					d.resolve( data );
				}else{
					data.bookListInAmazon = bookListInAmazon;
					d.resolve( data );
				}
			}
	    });
	};
	recursionOpExistenceBook();
	return d.promise;
};
