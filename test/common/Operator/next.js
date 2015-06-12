"use strict";

var util = require('util');
var _ = require('underscore');

var Operator = require('common/Operator')({
	query: "岩明均",
	type: "Author"
});

var log = require('common/log');

Operator.count(function(err){
	Operator.next(function(err, items){
		if(err){
			return log.info(util.inspect(err, null, null));
		}
		// /*
		var asins = items.map(function(item){
			/*
			try{
				log.info(item.ItemAttributes[0].Title);
			}catch(e){
				log.info(item);
			}
			*/
			return item.ASIN[0];
		});
		// */
		asins = _.uniq(asins);
		log.info(Operator.totalItems);
		log.info(items.length);
		log.info(asins.length);
	});
});
