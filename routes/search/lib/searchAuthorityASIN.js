var Q = require('q');
var itemLookUp = require('common/itemLookUp');
var interval = require('common/constant').interval;
var _ = require('underscore');

module.exports = function( data ){
  var d = Q.defer();
  var books = data.bookListInAmazon;

  if( books.length > 0 ){
    var modBooks = [];
    var execCount = 0;
    var recursion = function(execCount){
      mappingFunc(books[execCount])
      .done(function( modBook ){
        modBooks.push(modBook);
        execCount++;
        if( execCount < books.length -1 ){
          recursion(execCount);
        } else {
          data.bookListInAmazon = _.compact(modBooks);
          d.resolve(data);
        }
      });
    };
    recursion(execCount);
  }else{
    d.resolve(data);
  }

  return d.promise;
};

var mappingFunc = function( book ){
  var def = Q.defer();

  itemLookUp({
    ItemId: book.ASIN[0],
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems'
  }, function( res ){
    // 成功時の処理
    var AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
    book.AuthorityASIN = AuthorityASIN;
    return book;
  },function(error){
    // エラー時の処理
    console.log(error);
    return undefined;
  })
  .done(function(book){
    def.resolve(book);
  });

  return def.promise;
};
