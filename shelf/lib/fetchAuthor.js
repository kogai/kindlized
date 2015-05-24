"use strict";

var Q = require('q');
var moment = require('moment-timezone');

var Author = require('models/Author');

var log = require('common/log');
var limitAuthor = require('common/constant').limitAuthor;
var periodicalDay = require('common/constant').periodicalDay;

module.exports = function() {
  // DBから著者リストを非同期に取得する
  var d = Q.defer();

  var query = Author.find({
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
  .limit(limitAuthor);

  query.exec(function( error, authors ){
    log.info( authors.length, '人の著者の処理を実行する');
    d.resolve( authors );
  });

  return d.promise;
};
