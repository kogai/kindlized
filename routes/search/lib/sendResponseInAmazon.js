var Q = require('q');

module.exports = function( data ){
	var d = Q.defer();
	var res = data.res;
	res.send({
		bookListInAmazon: data.bookListInAmazon,
	});
	d.resolve( data );
	return d.promise;
};
