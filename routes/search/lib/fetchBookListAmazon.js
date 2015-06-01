"use strict";

var Q = require('q');
var log = require('common/log');

var OpHelper = require('apac').OperationHelper;
var MakeOpConfig = require('common/makeOpConfig');

var MakeExistenceExpression = require('routes/search/lib/makeExistenceExpression');
var modelBookList = require('models/BookList');
var modelAuthor = require('models/Author');
var constant = require('common/constant');

var opConfig = new MakeOpConfig();
var opExistenceBook = new OpHelper(opConfig);

var exceptionHasNotAuthor = function(book) {
	// 必須プロパティを持たない書籍のための例外処理
	if (!book.ASIN) {
    book.ASIN = ['UNDEFINED'];
  }
	if (!book.DetailPageURL){
    book.DetailPageURL = ['UNDEFINED'];
  }
	if (!book.ItemAttributes[0].Author){
    book.ItemAttributes[0].Author = ['UNDEFINED'];
  }
	if (!book.ItemAttributes[0].Title){
    book.ItemAttributes[0].Title = ['UNDEFINED'];
  }
	return book;
};

module.exports = function(data) {
	var d = Q.defer();

	var req = data.req;
	var newBook = req.body.newBook;
	var searchExpression = new MakeExistenceExpression(newBook);
	var intervalTimeIncrements = 0;

	var recursionOpExistenceBook = function() {
		opExistenceBook.execute('ItemSearch', searchExpression, function(err, res) {
			if (err) {
        return log.info(err);
      }
			var bookListInAmazon;
			try {
				bookListInAmazon = res.ItemSearchResponse.Items[0].Item;
			} catch (error) {
				log.info(res.ItemSearchErrorResponse.Error);
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
