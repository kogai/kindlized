'use strict';

var Q = require('q');
var moment = require('moment-timezone');

var ModelBookList = require('models/Book');
var log = require('common/log');

module.exports = function( book ) {
  var defferd = Q.defer();
  try  {
    ModelBookList.findOne({
      ASIN: book.ASIN
    }, function( err, dbBook ) {
      if (!dbBook) {
        try  {
          var newBook = new ModelBookList({
            ASIN: book.ASIN,
            author: book.author,
            title: book.title,
            publisher: book.publisher,
            publicationDate: book.publicationDate,
            price: book.price,
            url: book.url,
            images: book.images,
            isKindlized: book.isKindlized,
            isKindlizedUrl: false,
            modifiedLog: {
          		    AddBookAt: moment(),
          		    InspectKindlizeAt: moment(),
          		    AddASINAt: moment(),
          		    UpdateUrlAt: moment()
            },
            AuthorityASIN: book.AuthorityASIN
          });
          newBook.save(function( err ) {
            if (err) {
              return log.info(err);
            }
            log.info( '書籍:' + newBook.title + 'が登録されました'　);
            defferd.resolve( newBook );
          });
        }catch ( error ) {
          log.info(error);
          defferd.resolve(undefined);
        }
      }else  {
        defferd.resolve(undefined);
      }
    });
  }catch (error) {
    log.info(error);
    defferd.resolve( undefined );
  }finally  {
    return defferd.promise;
  }
};
