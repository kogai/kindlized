var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList');

module.exports = function() {
  var d = Q.defer();

  var query = ModelBookList.find({
    isKindlized: true,
    isKindlizedUrl: { $ne: true  }
  });

  query.exec(function(err, books){
    d.resolve(books);
  });

  return d.promise;
};
