var Q = require('q');

module.exports = function( authorData ){
  var d = Q.defer();

  var rawBookList = authorData.bookList;
  var modBookList = [];

  for (var i = 0; i < rawBookList.length; i++) {
    var rawBook = rawBookList[i];
    var modBook = {};
    try{
      var itemAttr = rawBook.ItemAttributes[0];
      if( rawBook.ImageSets ){
        var imageSets = JSON.stringify( rawBook.ImageSets );
      }

      modBook.status          = 'DEFAULT';
      modBook.ASIN            = rawBook.ASIN;
      modBook.ISBN            = rawBook.ISBN;
      modBook.SKU             = rawBook.SKU;
      modBook.EAN             = itemAttr.EAN;

      modBook.author          = itemAttr.Author;
      modBook.title           = itemAttr.Title;
      modBook.publisher       = itemAttr.Publisher;
      modBook.publicationDate = itemAttr.PublicationDate;
      modBook.price           = itemAttr.ListPrice;
      modBook.url             = rawBook.DetailPageURL;
      modBook.images          = imageSets;

    }catch( err ){
      modBook.status  = 'ERROR';
    }finally{
      if( ( modBook.EAN || modBook.status === 'ERROR' ) && !itemAttr.PackageQuantity && itemAttr.ListPrice ){
        modBookList.push(modBook);
      }
    }
  }
  authorData.bookList = modBookList;
  d.resolve( authorData );

  return d.promise;
};
