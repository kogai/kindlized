var Q = require('q');
var itemLookUp = require('common/itmeLookUp');
var interval = require('common/constant').interval;

module.exports = function( books ){
  var d = Q.defer();
  var queries = [];
  console.log( '\n\n最初の再帰処理が開始:', books.length + '\n\n' );

  var execCount = 0;
  var recursion = function(execCount){
    mappingFunc(books[execCount])
    .done(function( modifiableRecipe ){
      queries.push(modifiableRecipe);
      execCount++;
      if( execCount < books.length -1 ){
        recursion(execCount);
      } else {
        console.log('\n\n最初の再帰処理が完了\n\n');
        d.resolve(queries);
      }
    });
  };
  recursion(execCount);

  return d.promise;
};

var mappingFunc = function( book ){
  var def = Q.defer();
  console.log( book.title );

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
    def.resolve(modifiableRecipe);
  });

  return def.promise;
};
