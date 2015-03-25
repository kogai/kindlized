var Q = require('q');

module.exports = function(){
	var def = Q.defer();
	def.resolve();
	return def.promise;
};
