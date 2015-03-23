var Q = require('q');
var log = require('common/log');

var opHelper = require('apac').OperationHelper;
var makeOpConfig = require('common/makeOpConfig');

var makeExistenceExpression = require('routes/search/lib/makeExistenceExpression');
var modelBookList = require('shelf/lib/modelBookList');
var modelAuthor = require('author/lib/modelAuthor');
var constant = require('common/constant');

var opConfig = new makeOpConfig();
var opExistenceBook = new opHelper(opConfig);

module.exports = function(data) {
  var d = Q.defer();

  var req = data.req;
  var newBook = req.body.newBook;
  var existenceAuthorExpression = new makeExistenceExpression(newBook);
  var intervalTimeIncrements = 0;

  var recursionOpExistenceBook = function() {
    opExistenceBook.execute('ItemSearch', existenceAuthorExpression, function(err, res) {
      if (err) throw err;
      var bookListInAmazon;
      try {
        bookListInAmazon = res.ItemSearchResponse.Items[0].Item;
      } catch (error) {
        log.info(error, res.ItemSearchErrorResponse.Error);
        intervalTimeIncrements++;
        if (intervalTimeIncrements > 10) {
          data.bookListInAmazon = [];
          d.resolve(data);
        } else {
          setTimeout(function() {
            log.info(intervalTimeIncrements);
            recursionOpExistenceBook();
          }, constant.interval * intervalTimeIncrements);
        }
      } finally {
        if (bookListInAmazon === undefined) {
          data.bookListInAmazon = [];
          d.resolve(data);
        } else {
          bookListInAmazon = bookListInAmazon.map(exceptionHasNotAuthor);
          data.bookListInAmazon = bookListInAmazon;
          d.resolve(data);
        }
      }
    });
  };
  recursionOpExistenceBook();
  return d.promise;
};

var exceptionHasNotAuthor = function( book ){
  // 必須プロパティを持たない書籍のための例外処理
  if( !book.ASIN ) book.ASIN = 'UNDEFINED';
  if( !book.DetailPageURL ) book.DetailPageURL = 'UNDEFINED';
  if( !book.ItemAttributes[0].Author ) book.ItemAttributes[0].Author = 'UNDEFINED';
  if( !book.ItemAttributes[0].Title ) book.ItemAttributes[0].Title = 'UNDEFINED';
  return book;
};
