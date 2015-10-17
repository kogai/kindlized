import User from 'common/User';
import Book from 'common/Book';

const bookClass = Book();

export default {
  get: (req, res)=> {
    const userSession = process.env.NODE_ENV === 'development' ? '55098ed6c0fa27f716c0717e' : req.session.passport.user;
    if (!userSession) return res.status(500).send();

    const user = User(userSession);
    const page = Number(req.params.page);

    user.fetchRegisteredBooks((err, bookList)=> {
      if (err) return res.status(500).send();

      const conditions = {
        _id: {
          $in: bookList.map((ownbook)=> { return ownbook.bookId; }),
        },
      };

      bookClass.fetchPage(conditions, page, (pageError, books, hasNext)=> {
        if (pageError) return res.status(500).send();
        res.send({
          maxCount: bookList.length,
          books: books.map((book)=> {
            return bookClass.sanitizeForClient(book);
          }),
          hasNext: hasNext,
        });
      });
    });
  },
};
