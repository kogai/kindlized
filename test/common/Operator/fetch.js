"use strict";

var util = require('util');
var _ = require('underscore');

var Operator = require('common/Operator')({
	query: "岩明均",
	type: "Author"
});

var log = require('common/log');

Operator.count(function(err){
	Operator.fetch(function(err, items){
		if(err){
			return log.info(util.inspect(err, null, null));
		}
		log.info(Operator.totalItems);
		log.info(items.length);
	});
});
