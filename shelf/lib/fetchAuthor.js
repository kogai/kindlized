var Q = require('q');
var moment = require('moment-timezone');
var ModelAuthor = require('author/lib/modelAuthor');
var reduceListByDate = require('common/reduceListByDate');
var log = require('common/log');
var limit = require('common/constant').limit;
var periodicalDay = require('common/constant').periodicalDay;

module.exports = function() {
  // DBから著者リストを非同期に取得する
  var d = Q.defer();
  var authorList = [];

  var query = ModelAuthor
  .find({
		$or: [
      {
				lastModified: {
					$lte: moment().subtract( periodicalDay, 'days' )
				}
			}, {
				lastModified: {
					$exists: false
				}
			}
    ]
  })
  .sort({
    lastModified: 1
  })
  .limit( limit / 2 );

  query.exec(function( error, authors ){
    log.info( authors.length, '人の著者の処理を実行する');
    d.resolve( authors );
  });

  return d.promise;
};
