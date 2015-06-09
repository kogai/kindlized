"use strict";

var Q = require('q');
var fetchUsers = require('librarian/lib/addNewRelease/fetchUsers');
var handleUsers = require('librarian/lib/addNewRelease/handleUsers');
var log = require('common/log');

module.exports = function () {
	var d = Q.defer();

	Q.when()
	.then(fetchUsers)
	.then(handleUsers)
	.fail(function(err){
		log.info(err);
	})
	.done(function(){
		d.resolve();
	});

	return d.promise;
};
