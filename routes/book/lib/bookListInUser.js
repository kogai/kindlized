var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelUser     	= require( 'user' );
var modelBookList 	= require( 'shelf/lib/modelBookList' );
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

	var userBookListIds = [];
	for (var i = 0; i < userBookList.length; i++) {
		userBookListIds.push( userBookList[i].bookId );
	}

	modelBookList.find( { _id: { $in: userBookListIds } }, function( err, books ){
		var newBooks 	= [];

		for (var i = 0; i < books.length; i++) {
			var book 	= books[i];
			var bookId 	= book._id.toString();

			for (var j = 0; j < userBookList.length; j++) {
				if( bookId === userBookList[j].bookId ){
					books[i].isNotified = userBookList[j].isNotified
				}
			}

			/*
			mongodbのコレクションにプロパティを追加した状態でres.sendしても
			追加したプロパティを保持できないっぽいので
			新しくオブジェクトを作って必要なデータをコピー
			*/

			newBooks[i] = {
				title : books[i].title,
				_id 	: books[i]._id,
				url 	: books[i].url,
				isNotified 	: books[i].isNotified,
				isKindlized : books[i].isKindlized
			};
		}
      data.books 		= books;
      data.newBooks 	= newBooks;
		d.resolve( data );
	});
	return d.promise;
};

var renderRouter = function( data ){
	var books  = data.books;
	var newBooks  = data.newBooks;
	var res    = data.res;
	var d      = Q.defer();

	res.send( newBooks );
	d.resolve( newBooks );

	return d.promise;
}

module.exports = function( req, res ){
	fetchModelUser( req, res )
	.then( fetchBookList )
	.then( renderRouter )
	.done( function( newBooks ){
		try{
			console.log( 'このユーザーは' + newBooks.length + '冊の書籍を登録している' );
		}catch( err ){
			console.log( 'このユーザーは書籍を登録していない');
		}
	});
};
