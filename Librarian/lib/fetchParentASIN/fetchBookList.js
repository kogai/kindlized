var Q = require('q');
var moment = require('moment-timezone');
var modelBookList = require('models/BookList');
var log = require('common/log');
var limit = require('common/constant').limit;
var periodicalDay = require('common/constant').periodicalDay;

module.exports = function() {
	"use strict";
	var d = Q.defer();
	var query = modelBookList.find({
			$and: [{
				$or: [{
					AuthorityASIN: {
						$not: /.+/
					}
				}, {
					AuthorityASIN: 'UNDEFINED'
				}, {
					AuthorityASIN: ['UNDEFINED']
				}]
			}, {
				$or: [{
					"lastModifiedLogs.fetchParentASIN": {
						$lte: moment().subtract(periodicalDay, 'days')
					}
				}, {
					lastModifiedLogs: {
						$exists: false
					}
				}, {
					"lastModifiedLogs.fetchParentASIN": {
						$exists: false
					}
				}]
			}]
		})
		.limit(limit);

	query.exec(function(error, haveNotAuthorityAsin) {
		log.info(haveNotAuthorityAsin.length + '冊の書籍の処理を開始');
		if (haveNotAuthorityAsin.length === 0) {
			d.reject();
		} else {
			d.resolve(haveNotAuthorityAsin);
		}
	});

	return d.promise;
};