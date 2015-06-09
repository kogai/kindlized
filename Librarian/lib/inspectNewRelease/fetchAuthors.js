var Q = require('q');
var moment = require('moment-timezone');
var periodicalDay = require('common/constant').periodicalDay;
var limit = require('common/constant').limit;
var modelAuthor = require('models/Author');;

module.exports = function() {
	"use strict";
	var d = Q.defer();
	var query = modelAuthor.find({
			$or: [{
				wroteBooks: {
					$exists: false
				}
			}, {
				"wroteBooks.lastModified": {
					$lte: new Date("2015/03/31")
				}
			}, {
				"wroteBooks.lastModified": {
					$exists: false
				}
			}]
		})
		.limit(limit);

	query.exec(function(error, authors) {
		if (error) {
			d.reject(error);
		}
		if (authors.length > 0) {
			d.resolve(authors);
		} else {
			d.reject();
		}
	});

	return d.promise;
};