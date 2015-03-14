var Q = require('q');
var modelUser = require('user/lib/modelUser');
var constant = require('common/constant')

module.exports = function( data ){
	var d = Q.defer();

	var req 		= data.req;
	var book 	= data.book;
	var bookId 	= book._id;
	req.session.passport = {
		_id: constant._id
	};
	var _id 		= req.session.passport._id;

	modelUser.findOneAndUpdate( { _id: _id }, { $push: { bookList: bookId } }, function( err, user ){
		if( err ) {
			console.log( err );
			throw err;
		}
		d.resolve( data );
	});

	return d.promise;
};
