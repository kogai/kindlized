var Q = require('q');
var util = require('util');
var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');
var num = 0;

var opConfig = new makeOpConfig();
var opInspectBook = new opHelper(opConfig);

var execApi = function( expression, callback ) {
  var d = Q.defer();
  console.log('execApi');
  num++;
  opInspectBook.execute('ItemLookup', expression, function(err, res) {
    if (err) console.log('ItemLookupのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error);
    if (res.ItemLookupErrorResponse) {
      // リトライ
      console.log('ItemLookupのレスポンスエラー ' + res.ItemSearchErrorResponse);
      setTimeout(function(){
				execApi( expression );
			}, 500 * num);
    } else {
      console.log( '成功:', util.inspect( res.ItemLookupResponse, false, null) );
      try {
        callback(res);
      } catch (error) {
        console.log('hasRelatedItemsにエラー' + error);
      }finally{
        d.resolve();
      }
    }
  });
  return d.promise;
};

module.exports = execApi;
