var Q = require('q');
var _ = require('underscore');
var modelUser = require('user');

var findUser = function( data ) {
	"use strict";
	var def = Q.defer();

	modelUser.findOne({
		_id: data.req.session.passport.user
	}, function( err, user ) {
		if( err ){
			def.reject([]);
		}else{
			var authors = user.authorList.concat(data.authors);
			authors = _.uniq(authors);
			def.resolve(authors);
		}
	});

	return def.promise;
};

module.exports = function (data) {
	"use strict";
	var d = Q.defer();

	findUser(data)
	.done(function(authos){
		modelUser.findOneAndUpdate({
			_id: data.req.session.passport.user
		}, {
			authorList: authos
		}, function ( err ) {
			if( err ){
				d.reject(data);
			}else{
				d.resolve(data);
			}
		});
	});

	return d.promise;
};
