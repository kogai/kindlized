"use strict";

var Q = require('q');
var moment = require('moment-timezone');

var log = require('common/log');
var Author = require('models/Author');

module.exports = function(author) {
	// 著者リストの最終編集日をアップデート
	var d = Q.defer();

	var modifiedTime = moment();
  var query = { name: author.name };
  var update = { lastModified: modifiedTime };

	Author.findOneAndUpdate(query, update, function(err, author) {
    if(err){
      return log.info(err);
    }
		d.resolve(author);
	});

	return d.promise;
};
