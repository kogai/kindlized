var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList');

module.exports = function() {
  var d = Q.defer();
  ModelBookList.find({
    isKindlized: true
  }, function(err, result) {
    d.resolve(result);
  });
  return d.promise;
};
