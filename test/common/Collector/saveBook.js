"use strict";

var util = require('util');

var Collector = require('common/Collector')({ type: "book" });
var log = require('common/log');

Collector.saveBook({
	ASIN: ["0000000"],
	title: "君に届け",
	author: ["椎名軽穂"]
}, function(err, item){
	if(err){
		return log.info(util.inspect(err, null, null));
	}
	log.info(item);
});
