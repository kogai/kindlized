var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');
var log = require('common/log');
var limit = require('common/constant').limit;

module.exports = function() {
  var d = Q.defer();

  var query = modelBookList.find({
      AuthorityASIN: {
        $not: /.+/
      }
    })
    .limit(limit);

    query.exec(function(error, haveNotAuthorityAsin){
      log.info('AuthorityASINを持たない'+haveNotAuthorityAsin.length+'冊の書籍');
      d.resolve(haveNotAuthorityAsin);
    });

  return d.promise;
};
