var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');

module.exports = function() {
  var d = Q.defer();
  var query = {
    AuthorityASIN: /.+/,
    isKindlized: false
  };
  modelBookList.find(query, function(err, result) {
    d.resolve(result);
  });
  return d.promise;
};
