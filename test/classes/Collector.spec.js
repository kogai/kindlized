import assert from 'power-assert';
import mockgoose from 'mockgoose';
import moment from 'moment-timezone';
import _ from 'lodash';
import Collector from 'classes/Collector';
const AuthorCollector = Collector('author');
const BookCollector = Collector('book');

describe('/classes/Collector', ()=> {
  it('著者を保存できる', (done)=> {
    const author = '井上雄彦';
    AuthorCollector.save(author, (err, savedAuthor)=> {
      assert(err === null);
      assert(savedAuthor.pageId === 1);
      done();
    });
  });
  it('著者を同時に保存できる', (done)=> {
    const authors = ['井上雄彦', '冨樫義博', '森田まさのり'];
    AuthorCollector.saveCollections(authors, (err, savedAuthors)=> {
      assert(err === null);
      assert(savedAuthors.length === 3);
      assert(savedAuthors[0].pageId === 1);
      assert(savedAuthors[1].pageId === 2);
      assert(savedAuthors[2].pageId === 3);
      done();
    });
  });

  it('著者を保存できる', (done)=> {
    const book = {
      ASIN: 'BASKETBALL',
      author: '井上雄彦',
      title: 'SLAM DUNK',
    };

    BookCollector.save(book, (err, savedBook)=> {
      assert(err === null);
      assert(savedBook.ASIN[0] === book.ASIN);
      assert(savedBook.author[0] === book.author);
      assert(savedBook.title[0] === book.title);
      assert(savedBook.publisher[0] === '');
      assert(savedBook.publicationDate[0] === '');
      assert(savedBook.price[0] === '');
      assert(savedBook.url[0] === '');
      assert(savedBook.images === '');
      assert(savedBook.isKindlized === false);
      assert(savedBook.isKindlizedUrl === false);
      // assert(savedBook.modifiedLog.AddBookAt === '');
      // assert(savedBook.modifiedLog.InspectKindlizeAt === initialLibrarianTime);
      // assert(savedBook.modifiedLog.AddASINAt === initialLibrarianTime);
      // assert(savedBook.modifiedLog.UpdateUrlAt === initialLibrarianTime);
      done();
    });
  });
  it('保存時の必須パラメータを検証できる', ()=> {
    try {
      BookCollector.save('井上雄彦');
    } catch (err) {
      assert(_.isError(err));
    }
    try {
      BookCollector.save({
        ASIN: 'BASKETBALL',
      });
    } catch (err) {
      assert(_.isError(err));
    }
    try {
      BookCollector.save({
        ASIN: 'BASKETBALL',
        author: '井上雄彦',
      });
    } catch (err) {
      assert(_.isError(err));
    }
  });
  it('書籍を同時に保存できる', (done)=> {
    const books = [
      {
        ASIN: 'BASKETBALL',
        author: '井上雄彦',
        title: 'SLAM DUNK',
      }, {
        ASIN: 'KURAIYAGARE',
        author: '冨樫義博',
        title: '幽☆遊☆白書',
      }, {
        ASIN: 'ROKUDENASI',
        author: '森田まさのり',
        title: 'ろくでなしBLUES',
      },
    ];
    BookCollector.saveCollections(books, (err, savedBooks)=> {
      assert(err === null);
      assert(savedBooks.length === 3);
      assert(savedBooks[0].author[0] === books[0].author);
      assert(savedBooks[1].author[0] === books[1].author);
      assert(savedBooks[2].author[0] === books[2].author);
      done();
    });
  });

  afterEach(()=> {
    mockgoose.reset();
  });
});
