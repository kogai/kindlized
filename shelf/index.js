var Q	 = require( 'q' );
var fs	= require('fs');

var regInt					= require('./lib/regInt');
var fetchAuthor     = require('./lib/fetchAuthor');
var fetchPageCounts = require('./lib/fetchPageCounts');
var fetchBookList	  = require('./lib/fetchBookList');
var modifyBookList	= require('./lib/modifyBookList');
var saveBookList		= require('./lib/saveBookList');
var constant				= require('./lib/constant');

module.exports = function(){
	var defered = Q.defer();
	Q.when([])
	.then( fetchAuthor )
	.done(function( authorList ){
		var data = {
			times		: authorList.length,
			interval : constant.interval,
			obj			: {},
			defered	: defered,
			callBack : function( data ){
				var authorData = {
					author: authorList[ data.countExec ]
				};
				console.log( authorList[ data.countExec ], 'process has start.' );
				Q.when( authorData )
				.then( fetchPageCounts )
				.then( fetchBookList )
				.then( modifyBookList )
				.then( saveBookList )
				.done( function( authorData ){
					console.log( 'authorData', authorData.bookList.length );
					data.countExec++;
					data.regularInterval( data );
				});
			}
		};
		regInt( data );
	});
	return defered.promise;
};
