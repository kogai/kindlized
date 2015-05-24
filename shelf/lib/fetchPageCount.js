'use strict';

var Q = require('q');
var OpHelper = require('apac').OperationHelper;

var MakeOpConfig = require('./makeOpConfig');
var opConfig = new MakeOpConfig();
var opCountPages = new OpHelper(opConfig);

var MakeSearchExpression = require('./makeSearchExpression');
var INTERVAL = require('common/constant').INTERVAL;
var log = require('common/log');
var retryCount = 0;

var recursiveCallBack = function(author, callBack){
	var searchExpression = new MakeSearchExpression(author.name);
	opCountPages.execute('ItemSearch', searchExpression, callBack);
};

module.exports = function(author) {
	var d = Q.defer();

  var callBack = function(err, res) {
		if (err || res.ItemSearchErrorResponse) {
			// APIの呼び出し間隔が短すぎた時の処理
      retryCount++;
      if(retryCount > 50){
        d.reject({
					err: res.ItemSearchErrorResponse,
					author: author
				});
      }else{
				setTimeout(function() {
	        recursiveCallBack(author, callBack);
				}, INTERVAL * retryCount);
			}
		}else{
			// API呼び出しの成功処理
	    var	pageCount = res.ItemSearchResponse.Items[0].TotalPages[0];
			author.pageCount = Number(pageCount);
			d.resolve(author);
    }
	};
  recursiveCallBack(author, callBack);

	return d.promise;
};
