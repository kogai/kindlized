var Q = require('q');
var OpHelper = require('apac').OperationHelper;
var MakeOpConfig = require('./makeOpConfig');
var MakeSearchExpression = require('./makeSearchExpression');
var INTERVAL = require('common/constant').INTERVAL;
var log = require('common/log');

module.exports = function(authorData) {
  'use strict';
  var Author = authorData.author;
  var opConfig = new MakeOpConfig();
  var opCountPages = new OpHelper(opConfig);
  var searchExpression = new MakeSearchExpression(Author);
  var d = Q.defer();

  var pageCount = 0;
  var retryCount = 0;

  var callBack = function(err, res) {
    if (err){
      log.info('fetchPageCountsのレスポンスエラー ', err);
      log.info(res.ItemSearchErrorResponse);
    }
    try {
      pageCount = res.ItemSearchResponse.Items[0].TotalPages[0];
      authorData.pageCount = Number(pageCount);
      d.resolve(authorData);
    } catch (error) {
      retryCount += retryCount;
      log.info('fetchPageCountsの' + retryCount + '回目のリクエストエラー', error);
      log.info(res.ItemSearchErrorResponse);
      setTimeout(function() {
        searchExpression = new MakeSearchExpression(Author);
        opCountPages.execute('ItemSearch', searchExpression, callBack);
      }, INTERVAL * retryCount);
    }
  };
  opCountPages.execute('ItemSearch', searchExpression, callBack);
  return d.promise;
};
