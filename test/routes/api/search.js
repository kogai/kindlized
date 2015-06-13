"use strict";

require('should');
var request = require('supertest');
var app = require('app.js');

var log = require('common/log');
var result;

request(app)
.post('/api/search/amazon')
.send({
	newBook: '刃牙'
})
.end(function(err, res){
	res.body.map(function(book){
		// return log.info(book.isKindlized + ":" + book.title + ':' + book.author);
	});
});

/*
describe('Slackでメールを受信する', function(){
	before(function(done){
	});

	it('ポストリクエストが有効', function(){
		result.should.exactly('ok');
	});
});
*/
