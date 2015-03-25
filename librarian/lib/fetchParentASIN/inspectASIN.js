var Q = require('q');
var moment = require('moment-timezone');
var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');
var constant = require('common/constant');
var makeInspectExpression = require('librarian/lib/fetchParentASIN/makeInspectExpression');
var modelBookList = require('shelf/lib/modelBookList');
var log = require('common/log');
var logWrap = require('common/logWrap')('librarian',false);

module.exports = function(data) {
  var def = Q.defer();

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
    logWrap.info(error);
    bookASIN = 'UNDEFINED';
  }finally{
    inspectExpression = new makeInspectExpression(bookASIN);
  }

  opInspectBook.execute('ItemLookup', inspectExpression, function(error, res) {
    if (error) {
      logWrap.info('inspectASINのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error);
      error = null;
    }
    var modifiedModelBookList = {};

    if (res.ItemLookupResponse) {
      // リクエスト成功の時の処理
      try {
        // AuthorityASINを持っている書籍の処理
        var AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;

        modifyModelBook( book.ASIN, AuthorityASIN, moment() )
        .done(function(modBook){
          data.countExec++;
          data.book = modBook;
          def.resolve( data );
        });

      }catch (e) {
        // AuthorityASINを持っていない書籍の処理
        logWrap.info( res );
        modifyModelBook( book.ASIN, ['UNDEFINED'], moment() )
        .done(function(modBook){
          data.countExec++;
          data.book = modBook;
          def.resolve( data );
        });
      }
    } else {
      // リクエスト失敗の時の処理
      logWrap.info( res.ItemLookupErrorResponse.Error );
      retryCount++;
    }
    setTimeout(function() {
      // console.log('\n\nregularInterval\n\n', regularInterval.toString());
      regularInterval( data );
    }, retryCount * constant.interval);
  });

  return def.promise;
};

var modifyModelBook = function( ASIN, AuthorityASIN, moment ){
  var d = Q.defer();
  var queryModel = {
    ASIN: ASIN
  };
  var modifyModel = {
    AuthorityASIN: AuthorityASIN,
    lastModifiedLogs: {
      fetchParentASIN: moment
    }
  };
  var callbackModel = function( error, book ){
    console.log( book.title + 'のAuthorityASINを' + book.AuthorityASIN + 'に更新した');
    d.resolve(book);
  };
  modelBookList.findOneAndUpdate( queryModel, modifyModel, callbackModel );
  return d.promise;
};
