var Q = require('q');
var itemLookUp = require('common/itmeLookUp');

module.exports = function( books ){
  var d = Q.defer();
  console.log( 'lookUpEbooks', books.length );
  Q.all( books.map(mappingFunc) )
  .done(function(books){
    d.resolve(books);
  });
  return d.promise;
};

var mappingFunc = function( book ){
  var d = Q.defer();
  /*
  var modifiableRecipe = {
    AuthorityASIN: book.AuthorityASIN[0],
    title: book.title[0],
    ebookASIN: ebookASIN
  };
  */
  var ebookUrl;
  itemLookUp({
    ItemId: book.ebookASIN,
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'Small'
  }, function( res ){
    ebookUrl = res.ItemLookupResponse.Items[0].Item[0].DetailPageURL[0];
    // 成功時の処理
    return ebookUrl;
  },function(){
    // エラー時の処理
    ebookUrl = book.url;
    return ebookUrl;
  })
  .done(function(ebookUrl){
    book.url = ebookUrl;
    d.resolve(book);
  });
  return d.promise;
};
