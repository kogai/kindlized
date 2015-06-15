"use strict";

var request = require('supertest');
var app = require('app.js');

var log = require('common/log');

var mock = [
	"我が愛しのヲタ彼女(1) (エッジスタコミックス)	",
	"お前ら全員めんどくさい! (1) (メテオCOMICS)	",
	"新黒沢 最強伝説 3 (ビッグコミックス)",
	"ひとりぼっちの地球侵略 8 (ゲッサン少年サンデーコミックス)"
];

mock.forEach(function(query){
	request(app)
	.post('/api/save/series')
	.send({
		query: query
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
});
