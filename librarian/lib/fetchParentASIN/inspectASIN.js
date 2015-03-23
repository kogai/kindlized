var util = require('util');
var moment = require('moment-timezone');
var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');
var constant = require('common/constant');
var makeInspectExpression = require('librarian/lib/fetchParentASIN/makeInspectExpression');
var modelBookList = require('shelf/lib/modelBookList');
var log = require('common/log');

module.exports = function(data) {
  var retryInterval = 0;
  var retryCount = 0;
  var countExec = data.countExec;
  var bookList = data.bookList;
  var book = bookList[countExec];
  var regularInterval = data.regularInterval;

  var opConfig = new makeOpConfig();
  var opInspectBook = new opHelper(opConfig);
  var bookASIN;
  var inspectExpression;
  try{
    bookASIN = book.ASIN[0];
  }catch(error){
    log.info(error);
    bookASIN = 'UNDEFINED';
  }finally{
    inspectExpression = new makeInspectExpression(book.ASIN[0]);
  }

  opInspectBook.execute('ItemLookup', inspectExpression, function(error, res) {
    if (error) {
      log.info('inspectASINのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error);
      error = null;
    }
    var modifiedModelBookList = {};

    if (res.ItemLookupResponse) {
      // リクエスト成功の時の処理
      try {
        var AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
        modifiedModelBookList.AuthorityASIN = AuthorityASIN;
        modelBookList.findOneAndUpdate({
          ASIN: book.ASIN
        }, modifiedModelBookList, function(err, book) {
          log.info(book.title+'はAuthorityASIN / RelatedItemsを持っている');
          data.countExec++;
        });
      }catch (e) {
        // AuthorityASINを持っていない書籍の処理
        log.info(e,book);

        modelBookList.findOneAndUpdate({
          ASIN: book.ASIN
        }, modifiedModelBookList, function(err, book) {
          log.info(err, book);
          data.countExec++;
        });
      }
    } else {
      // リクエスト失敗の時の処理
      log.info('inspectASINのリクエストエラー API呼び出し間隔のエラー処理', res.ItemLookupErrorResponse.Error);
      retryCount++;
    }
    setTimeout(function() {
      regularInterval(data);
    }, retryCount * constant.interval);
  });

};
