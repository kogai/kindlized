"use strict";

var log = require('common/log');
var Mailer = require('common/Mailer')();

var mock = require('./mock_createMail');

Mailer.createTemplate("series", mock, function(err, mailStrings){
	if(err){
		return log.info(err);
	}
	Mailer.setMail("info@kindlized.it", "kogai0121@gmail.com", "test-subject", mailStrings);
	Mailer.send(function(err, info){
		if(err){
			return log.info(err);
		}
		log.info(info);
	});
});
