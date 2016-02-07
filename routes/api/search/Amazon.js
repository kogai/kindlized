import _ from 'underscore';

import Operator from 'common/Operator';
import BookClass from 'common/Book';

const bookInstance = BookClass();
const BookCollector = require('classes/Collector')('book');
const AuthorCollector = require('classes/Collector')('author');

import log from 'common/log';

export default function(req, res) {
  const query = req.query.query;
  const searchOperator = Operator({
    type: 'Title',
    query: query,
  });

  searchOperator.run((err, books = [])=> {
    if (err) {
      return log.info(err);
    }
    res.send(books.map((b)=> bookInstance.sanitizeForClient(b)));

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
  });
}
