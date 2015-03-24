var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList');
var limit = require('common/constant').limit;
var moment = require('moment-timezone');
var periodicalDay = require('common/constant').periodicalDay;
var log = require('common/log');

module.exports = function() {
  var d = Q.defer();

  var query = ModelBookList.find({
    isKindlized: true,
    isKindlizedUrl: { $ne: true  },
		$or: [
      {
				lastModifiedLogs: {
          modifyUrl: {
			      $lte: moment().subtract(periodicalDay, 'days')
          }
				}
			}, {
				lastModifiedLogs: {
		      $exists: false
				}
			}, {
				lastModifiedLogs: {
          modifyUrl: {
			      $exists: false
          }
				}
			}
		]
  })
  .limit(limit);

  query.exec(function(err, books){
    log.info(books);
    d.resolve(books);
  });

  return d.promise;
};
