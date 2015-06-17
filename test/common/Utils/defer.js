"use strict";

var Q = require('q');
var log = require('common/log');
var Utils = require('common/Utils')();

var tmpFunc = function(from, done){
	setTimeout(function(){
		done();
	}, 1000);
};

var _tmpFunc = Utils.defer(tmpFunc);

Q.when("test1")
.then(_tmpFunc)
.then(function(){
	log.info("end.");
});
