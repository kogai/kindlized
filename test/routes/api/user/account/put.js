"use strict";

const request = require('supertest');
// const request = require('superagent');

const app = require('app.js');
const log = require('common/log');

request(app)
// request
.put('/api/user/account/')
.send({
	property: 'mail',
	data: 'kogai0121@gmail.com'
})
.end(function(err, res){
	if(err){
		return log.info(err);
	}
	if(res.error){
		return log.info(res.error);
	}
	log.info(res);
});
