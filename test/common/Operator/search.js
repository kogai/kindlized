"use strict";

var util = require('util');

var Operator = require('common/Operator')();
var log = require('common/log');

Operator.search("刃牙道", 'Title', function(err, res){
	if(err){
		return log.info(util.inspect(err, null, null));
	}
	log.info(util.inspect(res, null, null));
});
