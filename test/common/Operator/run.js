"use strict";

var util = require('util');
var _ = require('underscore');
var heapdump = require('heapdump');

var Operator = require('common/Operator')({
	query: "岩明均",
	type: "Author"
});

var log = require('common/log');
heapdump.writeSnapshot('./logs/before.heapsnapshot');

Operator.run(function(){
	heapdump.writeSnapshot('./logs/after.heapsnapshot');
	log.info("end.");
});
