"use strict";

var util = require('util');
var _ = require('underscore');
var heapdump = require('heapdump');

var Operator = require('common/Operator')({
	query: "岩明均",
	type: "Author",
	ResponseGroup: 'ItemAttributes, Large'
});

var log = require('common/log');

Operator.count(function(err){
	heapdump.writeSnapshot('./logs/pre.heapsnapshot');
	Operator.fetch(function(err, items){
		if(err){
			return log.info(util.inspect(err, null, null));
		}
		heapdump.writeSnapshot('./logs/suf.heapsnapshot');
		log.info(Operator.totalItems);
		log.info(items.length);
	});
});
