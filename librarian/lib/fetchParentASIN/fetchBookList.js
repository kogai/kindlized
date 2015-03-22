var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList');
var reduceListByDate = require('common/reduceListByDate');

module.exports = function() {
  var d = Q.defer();
  ModelBookList.find({
    AuthorityASIN: {
      $not: /.+/
    }
  }, function(err, haveNotAuthorityAsin) {
    d.resolve(haveNotAuthorityAsin);
  });
  return d.promise;
};
