var Q = require('q');
var _ = require('underscore');

module.exports = function( data ){
	var d = Q.defer();
	var res = data.res;
	res.send({
		bookListInAmazon: data.savedBooks,
	});
	d.resolve( data );

	return d.promise;
};
