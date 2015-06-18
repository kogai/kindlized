"use strict";

var request = require('supertest');
var app = require('app.js');

var log = require('common/log');

var mock = [
	"屋上姫 1 (フレックスコミックス)",
	// /*
	"女の友情と筋肉(1) (星海社COMICS)	",
	"いぶり暮らし 2 (ゼノンコミックス)",
	"君に届け",
	"青空エール",
	"ライアー×ライアー(7) (デザ-ト)	",
	"恋愛暴君 1 (メテオCOMICS)	",
	"刃牙道　6 (少年チャンピオン・コミックス)	",
	"ヒストリエ（４）	",
	"だがしかし（１） 少年サンデーコミックス	",
	"深夜食堂（１２） (ビッグコミックススペシャル)	",
	"きのう何食べた?(1) (モーニング KC)	",
	"MAMA 5 (BUNCH COMICS)	",
	"亜人(1) (アフタヌーンKC)	",
	"亜人ちゃんは語りたい（１）	",
	"アサギロ~浅葱狼~ 10 (ゲッサン少年サンデーコミックス)	",
	"甘々と稲妻(3) (アフタヌーンKC)	",
	"いとしのムーコ（１）	",
	"いぬやしき(2) (イブニングKC)	",
	"乙嫁語り 4巻	",
	"げんしけん(1) (アフタヌーンKC)	",
	"月刊少女野崎くん (4) (ガンガンコミックスONLINE)	",
	"恋は雨上がりのように（１） (ビッグコミックス)	",
	"シドニアの騎士(5) (アフタヌーンKC)	",
	"十　～忍法魔界転生～（３）	",
	"昭和元禄落語心中(1) (KCx)	",
	"銀のニーナ ： 4 (アクションコミックス)	",
	"進撃の巨人(12) (講談社コミックス)	",
	"達人伝 -9万里を風に乗り-(4) (アクションコミックス)	",
	"デンキ街の本屋さん 5―BOOKSうまのほね (MFコミックス フラッパーシリーズ)	",
	"逃げるは恥だが役に立つ（４）	",
	"虹色デイズ 1 (マーガレットコミックス)	"
	// */
	];

// request = require('superagent');

mock.forEach(function(query){
	request(app)
	// request
	.post('/api/save/series')
	// .post('http://kindlize.it/api/save/series')
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
