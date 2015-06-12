"use strict";

var util = require('util');
var _ = require('underscore');

var Operator = require('common/Operator')({
	query: "秋本治",
	type: "Author"
});

var log = require('common/log');

Operator.count(function(err){
	Operator.fetchOverLimit(function(err, items){
		if(err){
			return log.info(util.inspect(err, null, null));
		}
		log.info(Operator.totalItems);
		log.info(items.length);
	});
});
