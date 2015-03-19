var Q = require('q');

module.exports = function( data ){
  var d = Q.defer();

  var bookListInAmazon = data.bookListInAmazon;
  Q.all( bookListInAmazon.map( fetchAsin ) )
  .done( function( listASIN ){
    data.listASIN = listASIN;
    d.resolve( data );
  });
  return d.promise;
};

var fetchAsin = function( book ){
  return book.ASIN;
};
