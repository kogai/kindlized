"use strict";

var Q = require('q');
var OpHelper = require('apac').OperationHelper;

var MakeOpConfig = require('./makeOpConfig');
var opConfig = new MakeOpConfig();
var opCountPages = new OpHelper(opConfig);
var MakeSearchExpression = require('./makeSearchExpression');
var INTERVAL = require('common/constant').INTERVAL;
var log = require('common/log');

var recursiveCallBack = function(author, callBack, pageCount){
	var searchExpression = new MakeSearchExpression(author.name, pageCount);
	opCountPages.execute('ItemSearch', searchExpression, callBack);
};

module.exports = function(author){
	var d = Q.defer();
	var maxCount = author.pageCount;
	var retryCount = 0;
	var pageCount = 1;
	var bookList = [];
	log.info(maxCount + 'ページ分の処理を開始');

	var callBack = function(err, res) {
		if (err || res.ItemSearchErrorResponse) {
			// APIの呼び出し間隔が短すぎた時の処理
      retryCount += 1;
			setTimeout(function() {
	      recursiveCallBack(author, callBack, pageCount);
			}, INTERVAL * retryCount);
		}else{
			// API呼び出しの成功処理
			if(pageCount > maxCount){
				log.info((pageCount - 1) + 'ページ分の処理を完了 : ' + bookList.length + '冊の処理を完了');
				author.bookList = bookList;
				d.resolve(author);
			}else{
				// 次の再帰呼び出しの前にretryCountを初期化する
				retryCount = 0;

				// resから書籍リストをストアする
				var bookListPerPage = res.ItemSearchResponse.Items[0].Item;
				bookList = bookList.concat(bookListPerPage);

				// カウントを進めて再帰
				pageCount += 1;
	      recursiveCallBack(author, callBack, pageCount);
			}
	  }
	};
	recursiveCallBack(author, callBack, pageCount);

	return d.promise;
};
