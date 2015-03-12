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

	var recursionOpExistenceBook = function(){
		opExistenceBook.execute( 'ItemLookup', existenceAuthorExpression,  function( err, bookListInAmazon ){
			try{
				console.log( 'bookListInAmazon', bookListInAmazon.ItemLookupResponse.Items[0].Request[0].Errors );
			}catch( err ){
				setTimeout( function(){
					recursionOpExistenceBook();
				}, constant.interval );
			}finally{
				// if isNewAuthor
				// 新規に著者を登録

				// if( 取得に成功 || 書籍が存在しない ){
					data.bookListInAmazon = bookListInAmazon;
					d.resolve( data );
				// }
			}
	    });
	};
	recursionOpExistenceBook();
	return d.promise;
};
