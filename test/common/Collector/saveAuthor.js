"use strict";

var util = require('util');

var Collector = require('common/Collector')('author');
var log = require('common/log');

Collector.saveAuthor("mytest01", function(err, item){
	if(err){
		return log.info(util.inspect(err, null, null));
	}
	log.info(item);
});