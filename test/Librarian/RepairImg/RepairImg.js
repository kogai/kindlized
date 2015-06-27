"use strict";

var RepairImg = require('Librarian/RepairImg')({
	// limit: 300
});

var log = require('common/log');

RepairImg.cron().done(function(){
	log.info('end.');
});
