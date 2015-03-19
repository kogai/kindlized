var ModelBookList = require('shelf/lib/modelBookList.js');

module.exports = function( book ) {
  ModelBookList.findOne({
    ASIN: book.ASIN
  }, function( err, dbBook ) {
    if (!dbBook) {

      var newBook = new ModelBookList({
        status: book.satus,
        ASIN: book.ASIN,
        EAN: book.EAN,
        author: book.author,
        title: book.title,
        publisher: book.publisher,
        publicationDate: book.publicationDate,
        price: book.price,
        url: book.url,
        images: book.images,
        isKindlized: false
      });

      newBook.save(function(err) {
        if (err) console.log(err);
        console.log( book.title, 'regist is success' );
      });
    }
  });
};
