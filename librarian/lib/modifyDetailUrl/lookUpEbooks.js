"use strict";

var Q = require('q');
var util = require('util');

var itemLookUp = require('common/itemLookUp');
var log = require('common/log');

var mappingFunc = function( book ){
  var def = Q.defer();
  var ebookUrl;
  itemLookUp({
    ItemId: book.ebookASIN,
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'Small'
  }, function( res ){
    ebookUrl = res.ItemLookupResponse.Items[0].Item[0].DetailPageURL[0];
    // 成功時の処理
    return ebookUrl;
  },function(error){
    // エラー時の処理
    ebookUrl = book.url;
    return ebookUrl;
  })
  .done(function(ebookUrl){
    book.url = ebookUrl;
    def.resolve(book);
  });
  return def.promise;
};

module.exports = function( books ){
  var d = Q.defer();
  if( books.length === 0) {
    d.resolve([]);
  }else{
    log.info( 'lookUpEbooks' + books.length );
    var execCount = 0;
    var recursion = function(execCount){
      mappingFunc(books[execCount])
      .done(function(){
        if( execCount < books.length -1 ){
          execCount++;
          recursion(execCount);
        }else{
          d.resolve(books);
        }
      });
    };
    recursion(execCount);
  }
  return d.promise;
};
