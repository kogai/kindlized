var Q = require('q');
var modelUser = require('user/');

module.exports = function () {
	'use strict';
	var d = Q.defer();

	modelUser.find({}, function(err, users) {
		if(err){
			d.reject(err);
		}
		d.resolve(users);
	});

	return d.promise;
};
