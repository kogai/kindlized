"use strict";

var request = require('superagent');

var log = require('common/log');
var url = process.argv[2] || 'http://localhost:3000/save';

console.log(url);

request
.post(url)
.send({
	ASIN: '486269098X',
	isAuthorPage: true
})
.end(function(err, ret){
  if(err){
    return log.info(err);
  }
  log.info(ret);
});
