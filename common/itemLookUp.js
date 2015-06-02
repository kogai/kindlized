"use strict";

var Q = require('q');
var util = require('util');
var OpHelper = require('apac').OperationHelper;
var MakeOpConfig = require('common/makeOpConfig');
var num = 0;
var opConfig = new MakeOpConfig();
var interval = require('common/constant').interval;
var log = require('common/log');

var createExpression = function ( expression ){
  var key;
  for (key in expression) {
    this[key] = expression[key];
  }
  return this;
};

var execApi = function( expression, callback, errorCallback, defferd ) {
  var opInspectBook = new OpHelper(opConfig);
  var searchExpression = new createExpression(expression);

  opInspectBook.execute('ItemLookup', searchExpression, function(err, res) {
      if (err) {
        return log.info(err);
      }
      if (res.ItemLookupErrorResponse) {
        log.info(res.ItemLookupErrorResponse);
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
          log.info(result);
          defferd.resolve(result);
        }
      }
    }
  );
};

module.exports = function( expression, callback, errorCallback ){
  var defferd = Q.defer();
  execApi(expression, callback, errorCallback, defferd);
  return defferd.promise;
};
