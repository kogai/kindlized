var Q = require('q');
var util = require('util');
var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');
var num = 0;
var opConfig = new makeOpConfig();
var interval = require('common/constant').interval;
var log = require('common/log');
var logWrap = require('common/logWrap')('itemLookUp',false);

var execApi = function( expression, callback, errorCallback, defferd ) {
  var opInspectBook = new opHelper(opConfig);
  var searchExpression = new createExpression(expression);

  opInspectBook.execute(
    'ItemLookup',
    searchExpression,
    function(err, res) {
      if (err) logWrap.info('ItemLookupのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error);
      if (res.ItemLookupErrorResponse) {
        logWrap.info('res.ItemLookupErrorResponse\n', res);
        num++;
        setTimeout(function(){
  				execApi( expression, callback, errorCallback, defferd );
  			}, interval * num);
      } else {
        var result;
        try {
          result = callback(res);
        } catch (error) {
          result = errorCallback(error);
        }finally{
          num = 0;
          logWrap.info('itemLookUp\n', result);
          defferd.resolve(result);
        }
      }
    }
  );
};

var createExpression = function ( expression ){
  for ( var val in expression ) {
    this[val] = expression[val];
  }
  return this;
};

module.exports = function( expression, callback, errorCallback ){
  var defferd = Q.defer();
  execApi(expression, callback, errorCallback, defferd);
  return defferd.promise;
};
