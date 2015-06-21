"use strict";

var util = require('util');

var Operator = require('common/Operator')({
	query: "板垣恵介",
	type: 'Author'
});
var log = require('common/log');

log.info(process.memoryUsage());

Operator.search(function(err, res){
	if(err){
		return log.info(util.inspect(err, null, null));
	}

log.info(process.memoryUsage());

	log.info("done.");
	// log.info(util.inspect(res, null, null));
});
