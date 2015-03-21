var Q = require('q');
var util = require('util');
var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');
var num = 0;
var opConfig = new makeOpConfig();
var interval = require('common/constant').interval;

var execApi = function( expression, callback, errorCallback, defferd ) {
  var opInspectBook = new opHelper(opConfig);
  var searchExpression = new createExpression(expression);

  opInspectBook.execute(
    'ItemLookup',
    searchExpression,
    function(err, res) {
      if (err) console.log('ItemLookupのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error);
      if (res.ItemLookupErrorResponse) {
        console.log('res.ItemLookupErrorResponse\n', util.inspect( res, false, null ));
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
          console.log('itemLookUp\n', util.inspect( result, false, null ));
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
