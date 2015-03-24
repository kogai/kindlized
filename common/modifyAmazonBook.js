module.exports = function( rawBook ){
  var modBook;
  var itemAttr;
  try{
    itemAttr  = rawBook.ItemAttributes[0];
    /*
      mongodbはkey名に$を含むオブジェクトを扱えないので
      文字列化して保存する
      使う時はJSON.parse()する
    */
    var imageSets;
    if( rawBook.ImageSets ) imageSets = JSON.stringify( rawBook.ImageSets );

    modBook = {
      status          : 'DEFAULT',
      ASIN            : rawBook.ASIN,
      ISBN            : rawBook.ISBN,
      SKU             : rawBook.SKU,
      EAN             : itemAttr.EAN,
      author          : itemAttr.Author,
      title           : itemAttr.Title,
      publisher       : itemAttr.Publisher,
      publicationDate : itemAttr.PublicationDate,
      price           : itemAttr.ListPrice,
      url             : rawBook.DetailPageURL,
      images          : imageSets,
      isKindlized     : false
    };

  }catch( err ){
    modBook.status  = 'ERROR';
  }finally{
    return modBook;
  }
};
