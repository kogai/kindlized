"use strict";

var util = require('util');

var Operator = require('common/Operator')({
	query: "板垣恵介",
	type: 'Author'
});
var log = require('common/log');


Operator.search(function(err, res){
	if(err){
		return log.info(util.inspect(err, null, null));
	}
	log.info("done.");
	// log.info(util.inspect(res, null, null));
});
