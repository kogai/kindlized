var Q = require('q');
var moment = require('moment-timezone');
var ModelBookList = require('models/BookList');

module.exports = function( books ) {
  var d = Q.defer();

  Q.all(books.map(function(book){
    ModelBookList.findOneAndUpdate({
      // query
      AuthorityASIN: book.AuthorityASIN
    },{
      // modify
      url: book.url,
      isKindlizedUrl: true,
      lastModifiedLogs: {
        modifyUrl: moment()
      }
    },function(err, book){
      return book;
    });
  }))
  .done(function( books ){
    // d.resolve(books);
  });

  d.resolve(books);
  return d.promise;
};
