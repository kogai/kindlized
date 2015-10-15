'use strict';

var _ = require('underscore');

var Operator = require('common/Operator');
var BookCollector = require('classes/Collector')('book');
var AuthorCollector = require('classes/Collector')('author');

var log = require('common/log');

module.exports = function(req, res) {
  var query = req.query.query;

  var searchOperator = Operator({
    type: 'Title',
    query: query
  });

  searchOperator.run(function(err, books) {

    books.map(function(book) {
      return log.info(book.title);
    });

    if (books) {
      res.send(books);
    }else  {
      res.send([]);
    }

    // 書籍の登録処理
    BookCollector.saveCollections(books, function(err, savedBooks) {
      if (err) {
        return log.info(err);
      }
      if (savedBooks.length === 0) {
        return log.info('新しく登録した書籍はありません');
      }
      log.info('新規書籍登録: ' + savedBooks.title);
    });

    // 著者の登録処理
    var authors = books.map(function(book) {
      return book.author;
    });

    authors = _.flatten(authors);
    authors = _.uniq(authors);
    authors = _.compact(authors);

    AuthorCollector.saveCollections(authors, function(err, savedAuthors) {
      if (err) {
        return log.info(err);
      }
      if (savedAuthors.length === 0) {
        return log.info('新しく登録した著者はいません');
      }
      log.info(savedAuthors);
    });

    searchOperator = null;
    books = null;
  });
};
