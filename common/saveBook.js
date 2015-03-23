var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList.js');
var log = require('common/log');

module.exports = function( book ) {
  var defferd = Q.defer();
  try{
    ModelBookList.findOne({
      ASIN: book.ASIN
    }, function( err, dbBook ) {
      if (!dbBook) {
        try{
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
          newBook.save(function( err ) {
            if (err) console.log(err);
            log.info( '書籍:' + newBook.title + 'が登録されました'　);
            defferd.resolve(newBook);
          });
        }catch(error){
          log.info(error);
          defferd.resolve();
        }
      }
    });
  }catch(error){
    log.info(error);
    defferd.resolve();
  }finally{
    return defferd.promise;
  }
};
