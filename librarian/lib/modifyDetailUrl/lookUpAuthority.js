var Q = require('q');
var itemLookUp = require('common/itmeLookUp');

module.exports = function( books ){
  var d = Q.defer();
  console.log( 'lookUpAuthority', books.length );
  Q.all( books.map(mappingFunc) )
  .done(function(books){
    d.resolve(books);
  });
  return d.promise;
};

var mappingFunc = function( book ){
  var d = Q.defer();
  var modifiableRecipe = {
    AuthorityASIN: book.AuthorityASIN,
    title: book.title,
    url: book.url
  };

  itemLookUp({
    ItemId: book.AuthorityASIN[0],
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems, Small'
  }, function( res ){
    var relatedItems = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem;
    // 成功時の処理
    relatedItems.forEach(function(item) {
      var relatedBook = item.Item[0].ItemAttributes[0];
      if (relatedBook.ProductGroup[0] === 'eBooks') {
        var ebookASIN = item.Item[0].ASIN[0];
        modifiableRecipe.ebookASIN = ebookASIN;
      }
    });
    return modifiableRecipe;
  },function(error){
    // エラー時の処理
    console.log(error);
    return modifiableRecipe;
  })
  .done(function(modifiableRecipe){
    d.resolve(modifiableRecipe);
  });
  return d.promise;
};
