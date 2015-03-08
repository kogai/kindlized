module.exports = function( authorData ){
  var rawBookList = authorData.bookList;
  var modBookList = [];

  for (var i = 0; i < rawBookList.length; i++) {
    var rawBook = rawBookList[i];
    var modBook = {};
    try{
      var itemAttr = rawBook.ItemAttributes[0];

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

    }catch( err ){
      modBook.status  = 'ERROR';
    }finally{
      if( ( modBook.EAN || modBook.status === 'ERROR' ) && !itemAttr.PackageQuantity && itemAttr.ListPrice ){
        modBookList.push(modBook);
      }
    }
  }
  authorData.bookList = modBookList;
  return authorData;
};
