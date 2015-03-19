var Q 						= require('q');
var _ 						= require('underscore');
var express	 			= require('express');
var router	  		= express.Router();

var modelBookList = require( 'shelf/lib/modelBookList' );
var modelAuthor 	= require( 'author/lib/modelAuthor' );
var constant 			= require( 'common/constant' );

var opHelper								= require( 'apac' ).OperationHelper;
var makeOpConfig 						= require( 'common/makeOpConfig' );
var makeExistenceExpression	= require( 'routes/search/lib/makeExistenceExpression' );

var fetchBookListDB					= require( 'routes/search/lib/fetchBookListDB' );
var sendResponseInDB				= require( 'routes/search/lib/sendResponseInDB' );

var fetchBookListAmazon			= require( 'routes/search/lib/fetchBookListAmazon' );
var sendResponseInAmazon		= require( 'routes/search/lib/sendResponseInAmazon' );
var saveBookListToDB 				= require( 'routes/search/lib/saveBookListToDB' );
var fetchBookListFromAmazon = require( 'routes/search/lib/fetchBookListFromAmazon' );
var fetchAuthorListAmazon		= require( 'routes/search/lib/fetchAuthorListAmazon' );
var saveNewAuthor						= require( 'routes/search/lib/saveNewAuthor' );

var opConfig 				= new makeOpConfig();
var opExistenceBook = new opHelper( opConfig );

var fetchAuthorListDB = function( data ){
	var d = Q.defer();

	var bookListInDB 			= data.bookListInDB;
	var authorsRelatedWithBook 	= [];

	for (var i = 0; i < bookListInDB.length; i++) {
		var authorName = bookListInDB[i].author;
		for (var j = 0; j < authorName.length; j++) {
			authorsRelatedWithBook.push( authorName[j] );
		}
	}

	authorsRelatedWithBook = _.uniq( authorsRelatedWithBook );
	modelAuthor.find( { name: { $in: authorsRelatedWithBook } }, function( err, authorsRelatedWithBookInDB ){
		if( err ) throw err;
		data.authorsRelatedWithBook 	= authorsRelatedWithBook;
		data.authorsRelatedWithBookInDB = authorsRelatedWithBookInDB;

		var countAuthors = authorsRelatedWithBookInDB.length;
		data.isNewAuthor = false;
		if( countAuthors === 0 ){
			data.isNewAuthor = true;
		}

		d.resolve( data );
	});
	return d.promise;
};

router.post( '/db', function( req, res ) {
	Q.when({
		res : res,
		req : req
	})
	.then( fetchBookListDB )
	.then( sendResponseInDB )
	.done( function( data ){
		console.log('DB内の検索処理完了.');
	});
});

router.post( '/amazon', function( req, res ) {
	Q.when({
		res : res,
		req : req
	})
	.then( fetchBookListAmazon )
	.then( sendResponseInAmazon )
	// todo: Amazonから取得したraw書籍データを保存用に整形
	// todo: modifyBookList関数をcommon化
	.then( saveBookListToDB )
	.then( fetchBookListFromAmazon )
	// .then( fetchAuthorListDB )
	// .then( fetchAuthorListAmazon )
	// .then( saveNewAuthor )
	.done( function( data ){
		console.log( 'data.bookListInAmazon', data.bookListInAmazon );
		console.log('AmazonAPIの検索処理完了.');
	});
});

module.exports = router;
