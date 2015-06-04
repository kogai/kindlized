"use strict";

var Q = require('q');

module.exports = function( data ){
	var d = Q.defer();
	var res = data.res;
	res.send({
		bookListInDB: data.bookListInDB
	});
	d.resolve(data);
	return d.promise;
};
