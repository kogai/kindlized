var Q = require('q');
var _ = require('underscore');
var log = require('common/log');

var modelBookList = require('shelf/lib/modelBookList');
var saveBook = require('common/saveBook');

module.exports = function(data) {
  var d = Q.defer();
  var bookListInAmazon = data.bookListInAmazon;

  Q.all(
      bookListInAmazon.map(function(book) {
        log.info('保存する書籍は',book);
        var def = Q.defer();
        saveBook(book)
          .done(function(book) {
            def.resolve(book);
          });
        return def.promise;
      })
    )
    .done(function(savedBooks) {
      log.info('書籍の登録が完了', savedBooks);
      savedBooks = _.compact( savedBooks );
      data.savedBooks = savedBooks;
      d.resolve(data);
    });

  return d.promise;
};
/*
var obj =  { status: 'DEFAULT',
  ASIN: [ '4150102244' ],
  ISBN: undefined,
  SKU: undefined,
  EAN: [ '9784150102241' ],
  author: [ 'ブライアン W.オールディス' ],
  title: [ '地球の長い午後 (ハヤカワ文庫 SF 224)' ],
  publisher: [ '早川書房' ],
  publicationDate: [ '1977-01-28' ],
  price:
   [ { Amount: [Object],
       CurrencyCode: [Object],
       FormattedPrice: [Object] } ],
  url: [ 'http://www.amazon.co.jp/%E5%9C%B0%E7%90%83%E3%81%AE%E9%95%B7%E3%81%84%E5%8D%88%E5%BE%8C-%E3%83%8F%E3%83%A4%E3%82%AB%E3%83%AF%E6%96%87%E5%BA%AB-224-%E3%83%96%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3-W-%E3%82%AA%E3%83%BC%E3%83%AB%E3%83%87%E3%82%A3%E3%82%B9/dp/4150102244%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4150102244' ],
  images:'[{"ImageSet":[{"$":{"Category":"primary"},"SwatchImage":[{"URL":["http://ecx.images-amazon.com/images/I/51a0M9PaInL._SL30_.jpg"],"Height":[{"_":"30","$":{"Units":"pixels"}}],"Width":[{"_":"21","$":{"Units":"pixels"}}]}],"SmallImage":[{"URL":["http://ecx.images-amazon.com/images/I/51a0M9PaInL._SL75_.jpg"],"Height":[{"_":"75","$":{"Units":"pixels"}}],"Width":[{"_":"52","$":{"Units":"pixels"}}]}],"ThumbnailImage":[{"URL":["http://ecx.images-amazon.com/images/I/51a0M9PaInL._SL75_.jpg"],"Height":[{"_":"75","$":{"Units":"pixels"}}],"Width":[{"_":"52","$":{"Units":"pixels"}}]}],"TinyImage":[{"URL":["http://ecx.images-amazon.com/images/I/51a0M9PaInL._SL110_.jpg"],"Height":[{"_":"110","$":{"Units":"pixels"}}],"Width":[{"_":"77","$":{"Units":"pixels"}}]}],"MediumImage":[{"URL":["http://ecx.images-amazon.com/images/I/51a0M9PaInL._SL160_.jpg"],"Height":[{"_":"160","$":{"Units":"pixels"}}],"Width":[{"_":"112","$":{"Units":"pixels"}}]}],"LargeImage":[{"URL":["http://ecx.images-amazon.com/images/I/51a0M9PaInL.jpg"],"Height":[{"_":"500","$":{"Units":"pixels"}}],"Width":[{"_":"350","$":{"Units":"pixels"}}]}]}]}]' }
*/
