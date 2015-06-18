"use strict";

var log = require('common/log');
var Series = require('Librarian/Series')();
var mocks = [
	"我が愛しのヲタ彼女(1) (エッジスタコミックス)",
	"お前ら全員めんどくさい! (1) (メテオCOMICS)	",
	"お前ら全員めんどくさ!い！！?？ (３) (メテオCOMICS)	",
	"新黒沢 最強伝説 3 (ビッグコミックス)",
	"ひとりぼっちの地球侵略 8 (ゲッサン少年サンデーコミックス)"
];

mocks.forEach(function(mock){
	var res = Series._trimChar(mock);
	log.info(res.length + ':' + res);
});

log.info('test');
