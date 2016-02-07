import escape from 'escape-regexp';
import BookList from 'models/Book';
import log from 'common/log';
import BookClass from 'common/Book';

const bookInstance = BookClass();

export default function(req, res) {
  const query = escape(req.query.query);
  const queryRegExp = new RegExp(query);

  BookList.find({
    title: queryRegExp,
  }, (err, books)=> {
    if (err) {
      return log.info(err);
    }
    res.send(books.map((b)=> bookInstance.sanitizeForClient(b)));
  });
}
