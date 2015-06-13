"use strict";

var util = require('util');
var _ = require('underscore');

var Operator = require('common/Operator')({
	query: "岩明均",
	type: "Author"
});

var log = require('common/log');

Operator.run(function(){
	log.info("end.");
});
