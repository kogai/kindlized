var Q = require('q');
var modelUser = require('user');
var constant = require('common/constant')

module.exports = function( data ){
	var d = Q.defer();

	var req 		= data.req;
	var book 	= data.book;
	var bookId 	= book._id;
	var addBook = {
		bookId: bookId,
		isNotified: false
	};

	// @todo
	// ログイン処理の実装後に削除する
	req.session.passport = {
		_id: constant._id
	};

	var _id 		= req.session.passport._id;

	modelUser.findOneAndUpdate( { _id: _id }, { $push: { bookList: addBook } }, function( err, user ){
		if( err ) {
			console.log( err );
			throw err;
		}
		d.resolve( data );
	});

	return d.promise;
};
