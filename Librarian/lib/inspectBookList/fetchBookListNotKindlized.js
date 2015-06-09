var Q = require('q');
var modelBookList = require('models/BookList');
var limit = require('common/constant').limit;
var periodicalDay = require('common/constant').periodicalDay;
var moment = require('moment-timezone');

module.exports = function() {
	var d = Q.defer();

	var query = modelBookList.find({
			AuthorityASIN: /.+/,
			isKindlized: {
				$ne: true
			},
			$or: [
        {
					lastModified: {
						$lte: moment().subtract(periodicalDay, 'days')
					}
				}, {
					lastModified: {
						$exists: false
					}
				}

			]
		})
		.limit(limit);

	query.exec(function(error, haveAuthorityAsin) {
		console.log('Kindle化されていない' + haveAuthorityAsin.length + '冊の書籍');
		d.resolve(haveAuthorityAsin);
	});

	return d.promise;
};
