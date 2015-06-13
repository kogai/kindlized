"use strict";

var log = require('common/log');
var Que = require('common/Que')();
var mock = function(maxRange, prefix){
	var arr = [], i;
	for (i = 0; i < maxRange; i++) {
		if(prefix){
			arr.push(prefix + (i + 1));
		}else{
			arr.push(i + 1);
		}
	}
	return arr;
};

// Que.INTERVAL = 1000 * 10; //10秒

Que.register('twitter', function(payload){
	log.info(payload);
});

Que.push(mock(100));

Que.pull('twitter');
Que.pull('twitter');

Que.consume('twitter');

setTimeout(function(){
	Que.push(mock(100, "prefix-"));
}, this.INTERVAL);

setTimeout(function(){
	Que.push("string");
}, this.INTERVAL * 2);
