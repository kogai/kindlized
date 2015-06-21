"use strict";

var Q = require('q');
var util = require('util');
var OpHelper = require('apac').OperationHelper;
var MakeOpConfig = require('common/makeOpConfig');
var num = 0;
var opConfig = new MakeOpConfig();
var INTERVAL = require('common/constant').INTERVAL;
var log = require('common/log');
var warn = log.warn;

var CreateExpression = function (expression){
  var key;
  for (key in expression) {
    if (expression.hasOwnProperty(key)) {
       this[key] = expression[key];
    }
  }
  return this;
};

var execApi = function(expression, callback, errorCallback, defferd) {
  var opInspectBook = new OpHelper(opConfig);
  var searchExpression = new CreateExpression(expression);

  opInspectBook.execute('ItemLookup', searchExpression, function(err, res) {
      if (err) {
        return warn.info(err);
      }
      if (res.ItemLookupErrorResponse) {
        warn.info(res.ItemLookupErrorResponse);
        num++;
        setTimeout(function(){
  				execApi( expression, callback, errorCallback, defferd );
  			}, INTERVAL * num);
      } else {
        var result;
        try {
          result = callback(res);
        } catch (error) {
          result = errorCallback(error);
        }finally{
          num = 0;
          warn.info(result);
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
