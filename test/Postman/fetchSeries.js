"use strict";

var util = require('util');

var Postman = require('Postman/Postman')();
var log = require('common/log');

Postman.fetch(function(err, users){
	if(err){
		return log.info(err);
	}
	Postman.fetchSeries(users[0], function(err, seriesItems){
		if(err){
			return log.info(err);
		}
		log.info(seriesItems);
	});
});
