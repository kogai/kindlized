import Promise from 'bluebird';
import UserModel from 'models/User';
import log from 'common/log';

export default function({ kindlizedList, bookList, _id }) {
  return new Promise((resolve, reject)=> {
    const notifiedBookIDs = kindlizedList.map(kindlizedBook => kindlizedBook._id);
    const modifiedBookList = bookList.map((book)=> {
      notifiedBookIDs.forEach((notifiedBookID)=> {
        if (book.bookId.toString() === notifiedBookID.toString()) {
          book.isNotified = true;
        }
      });
      return book;
    });
    const conditions = { _id: _id };
    const update = { bookList: modifiedBookList };
    if (process.env.NODE_ENV !== 'test') {
      log.info(notifiedBookIDs);
      log.info(modifiedBookList);
      log.info(conditions);
    }
    UserModel.findOneAndUpdate(conditions, update, (err, savedUser)=> {
      if (err) {
        return reject(err);
      }
      resolve(savedUser);
    });
  });
}
