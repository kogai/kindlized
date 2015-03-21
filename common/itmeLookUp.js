var Q = require('q');
var util = require('util');
var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');
var num = 0;

var opConfig = new makeOpConfig();
var opInspectBook = new opHelper(opConfig);

var execApi = function( expression, callback, errorCallback ) {
  var d = Q.defer();
  num++;
  opInspectBook.execute('ItemLookup', expression, function(err, res) {
    if (err) console.log('ItemLookupのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error);
    if (res.ItemLookupErrorResponse) {
      console.log( 'res.ItemLookupErrorResponse', util.inspect( res.ItemLookupErrorResponse.Error, false, null ));
      setTimeout(function(){
				execApi( expression );
			}, 500 * num);
    } else {
      var result;
      try {
        result = callback(res);
      } catch (error) {
        result = errorCallback(error);
      }finally{
        d.resolve(result);
      }
    }
  });
  return d.promise;
};

module.exports = execApi;
