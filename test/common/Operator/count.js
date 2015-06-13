"use strict";

var util = require('util');

var Operator = require('common/Operator')({
	query: "ヒストリエ",
	type: "Title"
	// query: "岩明均",
	// type: "Author"
});

var log = require('common/log');

Operator.count(function(err){
	if(err){
		return log.info(util.inspect(err, null, null));
	}
	log.info(Operator.maxPage);
	log.info(Operator.totalItems);
});
