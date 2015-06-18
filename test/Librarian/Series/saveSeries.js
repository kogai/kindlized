"use strict";

var log = require('common/log');
var Series = require('Librarian/Series')();
var mock = '新装版 寄生獣';

var _mock = Series.saveSeries(mock, function(err, savedSeries){
	if(err){
		return log.info(err);
	}
	log.info(savedSeries);
});
