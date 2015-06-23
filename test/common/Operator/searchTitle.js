"use strict";

var util = require('util');
var log = require('common/log');

var Operator = require('common/Operator')({
	query: "すのはら荘",
	type: "Title"
});

Operator.run(function(err, items){
	log.info(util.inspect(err, null, null));
	log.info(util.inspect(items, null, null));
});

/*
Operator.search(function(err, res){
	if(err){
		return log.info(util.inspect(err, null, null));
	}

	log.info(util.inspect(res, null, null));
	log.info("done.");
});
*/
