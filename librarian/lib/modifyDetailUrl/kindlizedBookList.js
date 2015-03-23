var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList');
var limit = require('common/constant').limit;

module.exports = function() {
  var d = Q.defer();

  var query = ModelBookList.find({
    isKindlized: true,
    isKindlizedUrl: { $ne: true  }
  })
  .limit(limit);

  query.exec(function(err, books){
    d.resolve(books);
  });

  return d.promise;
};
