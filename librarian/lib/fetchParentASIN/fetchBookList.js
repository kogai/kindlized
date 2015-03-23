var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');
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
      console.log('AuthorityASINを持たない'+haveNotAuthorityAsin.length+'冊の書籍');
      d.resolve(haveNotAuthorityAsin);
    });

  return d.promise;
};
