import log from 'common/log';
import User from 'common/User';
import BookClass from 'common/Book';
const Book = BookClass();

export default {
  get(req, res) {
    if (!req.session.passport.user) {
      return res.status(500).send();
    }
    const user = User(req.session.passport.user);
    const page = Number(req.query.page);

    user.fetchRegisteredBooks((err, rawBookList)=> {
      if (err) {
        return res.status(500).send();
      }
      const bookList = rawBookList.filter((book)=> {
        if (!book.isNotified) {
          return book;
        }
      });

      const conditions = {
        _id: { $in: bookList.map(book => book.bookId) },
      };
      if (page) {
        // クエリパラメータにpageの指定があればそのページを返す
        Book.fetchPage(conditions, page, (fetchError, books, hasNext)=> {
          if (fetchError) {
            return log.info(fetchError);
          }
          res.send({
            maxCount: bookList.length,
            books: books.map((book)=> {
              return Book.sanitizeForClient(book);
            }),
            hasNext: hasNext,
          });
        });
      } else {
        // クエリパラメータがなければ全件を返す
        Book.fetchAll(conditions, (fetchError, books)=> {
          if (fetchError) {
            return log.info(fetchError);
          }
          res.send({
            maxCount: bookList.length,
            books: books.map((book)=> {
              return Book.sanitizeForClient(book);
            }),
          });
        });
      }
    });
  },

  post(req, res) {
    if (!req.session.passport.user) {
      return res.status(500).send();
    }
    const user = User(req.session.passport.user);
    const book = req.body;
    user.saveBook(book, (err, savedUser, registeredBook)=> {
      if (err) {
        return log.info(err);
      }
      if (typeof savedUser === 'string') {
        return log.info(savedUser);
      }
      res.send({
        book: Book.sanitizeForClient(registeredBook),
      });
    });
  },

  delete(req, res) {
    if (!req.session.passport.user) {
      return res.status(500).send();
    }
    const user = User(req.session.passport.user);
    console.log(req.query);
    const deleteBookId = req.query._id;
    user.reduceBook(deleteBookId, (err)=> {
      if (err) {
        return log.info(err);
      }
      res.status(200).send('書籍がメール通知リストから削除されました。');
    });
  },
};
