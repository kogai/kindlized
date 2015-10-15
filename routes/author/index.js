import Author from 'models/Author';
import Booklist from 'models/Book';
import _ from 'underscore';
import Q from 'q';

export default function(req, res) {
  const isLogined = req.session.passport.user;
  function encodeImgSrc(bookList) {
    return bookList.map((book)=> {
      let err;
      let images;
      try {
        images = JSON.parse(book.images);
        images = images[0].ImageSet[0].MediumImage[0].URL[0];
      } catch (_error) {
        err = _error;
        images = '';
      } finally {
        book.images = images;
      }
      if (err) {
        console.log(err);
        return book;
      }
      return book;
    });
  }

  const authorId = Number(req.params[0]);
  const authors = {};
  if (isNaN(authorId)) {
    return res.status(404).render('error', {
      title: 'ページが見つかりません。',
    });
  }

  function countAuthors() {
    const deffered = Q.defer();
    Author.count({}, (err, count)=> {
      authors.count = count;
      deffered.resolve(authors);
    });
    return deffered.promise;
  }

  function getAuthor(id, index) {
    const deffered = Q.defer();
    Author.findOne({ pageId: id }, (err, author)=> {
      if (err) {
        return deffered.reject(err);
      }
      authors[index] = author;
      deffered.resolve(authors);
    });
    return deffered.promise;
  }

  function getAuthorParallel() {
    const authorIds = [
      authorId - 1,
      authorId,
      authorId + 1,
    ];

    if (authorIds[2] > authors.count) {
      authorIds[2] = 1;
    }
    if (authorIds[0] === 0) {
      authorIds[0] = authors.count;
    }

    const deffered = Q.defer();
    Q.all(authorIds.map(getAuthor))
    .done((resultAuthors)=> {
      deffered.resolve(resultAuthors);
    });
    return deffered.promise;
  }


  var handleAuthorRoute = function() {
    var author = authors['1'];
    var authorPrev = authors['0'];
    var authorNext = authors['2'];
    if (authorPrev === null) {
      authorPrev = {
        pageId: null,
        name: null,
        isNotExist: true
      };
    }
    if (authorNext === null) {
      authorNext = {
        pageId: null,
        name: null,
        isNotExist: true
      };
    }
    if (!author) {
      return res.status(404).render('error', {
        title: 'ページが見つかりません。',
      });
    }
    Booklist.find({
      author: author.name
    }, function(err, books) {
      if (err) {
        console.log(err);
      }
      books = encodeImgSrc(books);
      const title = `${author.name}先生のKindle化された著書`;
      res.render('author', {
        title: title,
        description: `${title}の一覧ページです`,
        books: books,
        isLogined: isLogined,
        kindlizedBooks: (function(books) {
          books = books.map(function(book) {
            if (book.isKindlized) {
              return book;
            }
          });
          books = _.compact(books);
          return books;
        }(books)),
        pager: {
          prev: {
            pageId: authorPrev.pageId,
            name: authorPrev.name,
            isNotExist: authorPrev.isNotExist,
          },
          next: {
            pageId: authorNext.pageId,
            name: authorNext.name,
            isNotExist: authorNext.isNotExist,
          },
        },
      });
    });
  };

  countAuthors()
  .then(getAuthorParallel)
  .done(handleAuthorRoute);
}
