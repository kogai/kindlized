var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');
var limit = require('common/constant').limit;

module.exports = function() {
  var d = Q.defer();

  var query = modelBookList.find({
      AuthorityASIN: {
        AuthorityASIN: /.+/,
        isKindlized: false
      }
    })
    .limit(limit);

  query.exec(function(error, haveAuthorityAsin) {
    console.log('Kindle化されていない' + haveAuthorityAsin.length + '冊の書籍');
    d.resolve(haveAuthorityAsin);
  });

  return d.promise;
};
