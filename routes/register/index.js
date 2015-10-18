import Promise from 'bluebird';
import BookModel from 'models/Book';
import BookClass from 'common/Book';
import UserClass from 'common/User';

const findOneBook = Promise.promisify(BookModel.findOne.bind(BookModel));
const bookUtils = BookClass();

export default {
  get(req, res) {
    const userSession = req.session.passport.user;
    const ASIN = req.query.ASIN;
    if (!userSession) {
      return res.redirect(303, '/account/login');
    }
    if (!ASIN) {
      return res.redirect(303, '/');
    }
    let book;
    const bookConditions = {
      ASIN: ASIN,
    };
    const userUtils = UserClass(userSession);

    findOneBook(bookConditions)
    .then((_book)=> {
      book = _book;
      return new Promise((resolve, reject)=> {
        userUtils.saveBook(book, (err)=> {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    })
    .then(()=> {
      res.status(200).render('bookRegister', {
        title: '通知登録完了',
        book: bookUtils.sanitizeForClient(book),
      });
    })
    .catch(()=> {
      return res.redirect(303, '/');
    });
  },
};
