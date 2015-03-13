var Q = require('q');
var modelUser = require('user/lib/modelUser');

module.exports = function( data ){
	var d = Q.defer();

	var req 		= data.req;
	var book 	= data.book;
	var bookId 	= book._id;
	req.session.passport = {
		_id: '54a10f0f0aa5f89d434cb2c9'
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
