var Q = require('q');
var moment = require('moment-timezone');
var modelBookList = require('shelf/lib/modelBookList');
var log = require('common/log');
var limit = require('common/constant').limit;
var periodicalDay = require('common/constant').periodicalDay;

module.exports = function() {
  var d = Q.defer();

  var query = modelBookList.find({
      AuthorityASIN: {
        $not: /.+/
      },
			$or: [
        {
					lastModifiedLogs: {
            fetchParentASIN:{
			        $lte: moment().subtract(periodicalDay, 'days')
            }
					}
				}, {
					lastModifiedLogs: {
  		      $exists: false
					}
				}, {
					lastModifiedLogs: {
            fetchParentASIN: {
  			      $exists: false
            }
					}
				}
			]
    })
    .limit(limit);

    query.exec(function(error, haveNotAuthorityAsin){
      log.info('AuthorityASINを持たない'+haveNotAuthorityAsin.length+'冊の書籍');
      d.resolve(haveNotAuthorityAsin);
    });

  return d.promise;
};
