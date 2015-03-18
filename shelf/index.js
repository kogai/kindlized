var Q	 = require( 'q' );
var fs	= require('fs');

var regInt 						= require('shelf/lib/regInt');
var fetchAuthor     			= require('shelf/lib/fetchAuthor');
var inspectAuthor    		= require('shelf/lib/inspectAuthor');
var fetchPageCounts 			= require('shelf/lib/fetchPageCounts');
var fetchBookList	  			= require('shelf/lib/fetchBookList');
var modifyBookList			= require('shelf/lib/modifyBookList');
var saveBookList				= require('shelf/lib/saveBookList');
var constant					= require('shelf/lib/constant');

var authorRecursionCount = 0;

module.exports = function(){
	var defered = Q.defer();
	Q.when()
	.then( fetchAuthor )
	.done(function( authorList ){
		if( authorList.length === 0 ){
			defered.resolve();
		}
		var data = {
			times		: authorList.length,
			interval : constant.interval,
			obj			: {},
			callBack : function( data ){
				var authorData = {
					author: 	authorList[ data.countExec ],
					defered	: defered,
					authorList: authorList,
					authorRecursionCount: authorRecursionCount,
				};
				console.log( '\n------------------------\n' );
				console.log( authorData.author + 'の処理を開始' );
				Q.when( authorData )
				.then( inspectAuthor )
				.then( fetchPageCounts )
				.then( fetchBookList )
				.then( modifyBookList )
				.then( saveBookList )
				.done( function( authorData ){
		         console.log( authorData.author + '/' + authorData.bookList.length + '冊' + '著者毎の処理を完了' );
					console.log( '\n------------------------\n' );

					data.countExec++;
					data.regularInterval( data );

					if( data.countExec > authorData.authorList.length ){
		         	defered.resolve();
					}

				});
			}
		};
		regInt( data );
	});
	return defered.promise;
};
