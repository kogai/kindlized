"use strict";

var Q = require('q');
var _ = require('underscore');

var log = require('common/log');

module.exports = function( data ){
	var d = Q.defer();
	var res = data.res;
	log.info(data.savedBooks);
	res.send({
		bookListInAmazon: data.savedBooks
	});
	d.resolve( data );

	return d.promise;
};
