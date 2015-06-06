"use strict";
require('should');
var request = require('supertest');
var app = require('app.js');

var mock = require('./mock');
var result;

describe('Slackでメールを受信する', function(done){
	before(function(done){
		request(app)
		.post('/mail')
		.send(mock)
		.end(function(err, res){
			result = res.text;
			done();
		});
	});

	it('ポストリクエストが有効', function(){
		result.should.exactly('ok');
	});
});
