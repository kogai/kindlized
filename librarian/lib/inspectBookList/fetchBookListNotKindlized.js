var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');

module.exports = function() {
  var d = Q.defer();

  var query = modelBookList.find({
      AuthorityASIN: {
        AuthorityASIN: /.+/,
        isKindlized: false
      }
    })
    .limit(100);

  query.exec(function(error, haveAuthorityAsin) {
    console.log('AuthorityASINを持たない' + haveAuthorityAsin.length + '冊の書籍');
    d.resolve(haveAuthorityAsin);
  });

  return d.promise;
};
