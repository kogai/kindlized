"use strict";

var Q = require('q');
var log = require('common/log');
var Utils = require('common/Utils')();

var tmpFunc = function(from, to, done){
	log.info(from);
	log.info(to);
	setTimeout(function(){
		done();
	}, 1000);
};

var _tmpFunc = Utils.defer(tmpFunc);

_tmpFunc('test1', 'test2').then(function(){
	log.info("end.");
});

// Q.when("test1", "test2")
// .then(_tmpFunc)
// .then(function(){
// 	log.info("end.");
// });
