var Q = require('q');
var fetchUsers = require('librarian/lib/addNewRelease');
var logWrap = require('common/logWrap')('addNewRelease',true);

module.exports = function () {
	'use strict';
	var d = Q.defer();

	Q.when()
	.then(fetchUsers)
	.then(handleUsers)
	.fail(function(err){
		logWrap.info(err);
	})
	.done(function(){
		d.resolve();
	});

	return d.promise;
};
