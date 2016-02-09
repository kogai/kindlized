const _ = require('underscore');
const log = require('common/log');

class User {
  constructor(userId) {
    this.userId = userId;
    this.Series = require('Librarian/Series');
    this.UserCollections = require('models/User');
    this.BookCollections = require('models/Book');
  }

  /**
  @param { Object } book - kindle化メールの受信登録する書籍
  @param { Function } done - 完了後に呼ばれるコールバック関数
  **/
  saveBook(book, done) {
    const _self = this;
    const conditions = { _id: this.userId };
    const options = { upsert: true };

    this.BookCollections.findOne({
      ASIN: book.ASIN,
    }, function(err, searchedBook) {
      const newBook = {
        bookId: searchedBook._id,
        title: searchedBook.title[0],
        isNotified: false,
      };
      const updates = {
        $push: {
          bookList: newBook,
        },
      };
      _self.UserCollections.findOne(conditions, function(err, user) {
        if (err) {
          return done(err);
        }

        if (_.where(user.bookList, newBook).length > 0) {
          return done(null, 'この書籍は登録済みです。');
        }

        _self.UserCollections.findOneAndUpdate(conditions, updates, options, function(err, savedUser) {
          if (err) {
            return done(err);
          }
          done(null, savedUser, searchedBook);
        });
      });
    });
  }

  reduceBook(deleteBookId, done) {
    let _self = this;
    let conditions = { _id: this.userId };

    this.UserCollections.findOne(conditions, function(err, user) {
      if (err) {
        return done(err);
      }
      let reducedBookList = user.bookList.map(function(book) {
        if (book.bookId.toString() !== deleteBookId) {
          return book;
        }
      });
      let updates = {
        bookList: _.compact(reducedBookList)
      };
      _self.UserCollections.findOneAndUpdate(conditions, updates, function(err, savedUser) {
        if (err) {
          return done(err);
        }
        done(null, savedUser);
      });
    });
  }

  /**
  @param { Function } done - 完了後に呼ばれるコールバック関数
  **/
  fetchRegisteredBooks(done) {
    const conditions = {
      _id: this.userId,
    };

    this.UserCollections.findOne(conditions, function(err, user) {
      if (err) {
        return done(err);
      }
      let notNotifiedBooks = user.bookList.map(function(book) {
        if (!book.isNotified) {
          return book;
        }
      });
      notNotifiedBooks = _.compact(notNotifiedBooks);
      done(null, notNotifiedBooks);
    });
  }

  fetchRegisteredSeries() {

  }


  /**
  @param { String } property - 編集するプロパティ名
  @param { String | Array | Object } data - 編集するデータ
  @param { Function } done - 完了後に呼ばれるコールバック関数
  **/
  modifiyProfile(property, data, done) {
    const conditions = { _id: this.userId };
    const updates = {};
    updates[property] = data;
    const options = {
      upsert: true,
    };

    this.UserCollections.findOneAndUpdate(conditions, updates, options, (err)=> {
      if (err) {
        return done(err);
      }
      done(null);
    });
  }
}

export default (userId)=> new User(userId);
