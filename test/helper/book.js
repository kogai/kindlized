import Promise from 'bluebird';
import BookModel from 'models/Book';
import Collector from 'classes/Collector';

const BookCollector = Collector('book');
const defaultBook = {
  ASIN: 'BASKETBALL',
  author: '井上雄彦',
  title: 'SLAM DUNK',
};

function createBook(book = defaultBook) {
  const newBook = new BookModel(book);
  return new Promise((resolve)=> {
    newBook.save(resolve);
  });
}

function createBooks(numberOfBooks = 100) {
  const bookIndexes = Array.from(new Array(numberOfBooks), (value, index) => index);
  const books = bookIndexes.map((bookIndex)=> {
    return {
      ASIN: `${bookIndex}-${defaultBook.ASIN}`,
      author: `${bookIndex}-${defaultBook.author}`,
      title: `${bookIndex}-${defaultBook.title}`,
      isKindlized: bookIndex % 2 === 0,
    };
  });
  return new Promise((resolve)=> {
    BookCollector.saveCollections(books, resolve);
  });
}

function createAndFindBooks(numberOfBooks = 100) {
  return new Promise((resolve)=> {
    createBooks(numberOfBooks)
      .then(()=> {
        BookModel.find({}, (err, users)=> {
          resolve(users);
        });
      });
  });
}

export {
  createBook,
  createBooks,
  createAndFindBooks,
};
