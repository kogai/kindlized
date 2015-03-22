var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList.js');

module.exports = function( book ) {
  var d = Q.defer();
  ModelBookList.findOne({
    ASIN: book.ASIN
  }, function( err, dbBook ) {
    if (!dbBook) {

      var newBook = new ModelBookList({
        status: book.satus,
        ASIN: book.ASIN,
        AuthorityASIN: book.AuthorityASIN,
        EAN: book.EAN,
        author: book.author,
        title: book.title,
        publisher: book.publisher,
        publicationDate: book.publicationDate,
        price: book.price,
        url: book.url,
        images: book.images,
        isKindlized: book.isKindlized
      });

      newBook.save(function( err ) {
        if (err) console.log(err);
        console.log( '書籍:' + newBook.title + 'が登録されました'　);
        d.resolve(newBook);
      });
    }else{
      d.resolve();
    }
  });
  return d.promise;
};
