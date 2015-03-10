var Q = require('q');

module.exports = function( bookList ){
  var d = Q.defer();
  d.resolve( bookList );
  return d.promise;
};
