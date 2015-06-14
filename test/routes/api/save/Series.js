"use strict";

var request = require('supertest');
var app = require('app.js');

var log = require('common/log');

request(app)
.post('/api/save/series')
.send({
	query: "我が愛しのヲタ彼女(1) (エッジスタコミックス)	"
})
.end(function(err, res){
	if(err){
		return log.info(err);
	}
	if(res.error){
		return log.info(res.error);
	}
	log.info(res.body);
});
