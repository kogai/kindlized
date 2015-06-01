"use strict";

var Q = require('q');
var itemLookUp = require('common/itemLookUp');
var interval = require('common/constant').interval;
var _ = require('underscore');
var log = require('common/log');

var mappingFunc = function( book ){
  var def = Q.defer();
  try{
    itemLookUp({
      ItemId: book.AuthorityASIN[0],
      RelationshipType: 'AuthorityTitle',
      ResponseGroup: 'RelatedItems, Small'
    }, function( res ){
      // 成功時の処理
      var relatedItems = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem;
      relatedItems.forEach(function(item) {
        var relatedBook = item.Item[0].ItemAttributes[0];
        if (relatedBook.ProductGroup[0] === 'eBooks') {
          book.isKindlized = true;
        }
      });
      return book;
    },function(error){
      // エラー時の処理
      log.info(error);
      return book;
    })
    .done(function(book){
      def.resolve(book);
    });
  }catch( error ){
    def.resolve(book);
  }

  return def.promise;
};

module.exports = function( data ){
  var d = Q.defer();
  var books = data.bookListInAmazon;
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

  return d.promise;
};
