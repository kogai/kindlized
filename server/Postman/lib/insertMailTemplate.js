'use strict';
// postListをメールのテンプレートに挿入

var Q = require('q');

module.exports = function(user) {
  var d = Q.defer();

  var kindlizedList = user.kindlizedList;

  var sendHtmlBook = '';
  var i;
  for (i = 0; i < kindlizedList.length; i++) {
    var book = kindlizedList[i];
    var images;
    var image = {};
    try {
      images = JSON.parse(book.images);
      image = images[0].ImageSet[0].MediumImage[0];
    } catch (e) {
      image.url = '';
    }

    sendHtmlBook += '<tr>' +
      '<th><img src="' + image.URL + '" ></th>' +
      '<td>' +
      '<a href="' + book.url + '">' + book.title + '</a>' +
      '</td>' +
      '</tr>';
  }

  var sendHtml = '' +
    '新しくKindle化された書籍をお知らせします。<br>' +
    '<table>' +
    sendHtmlBook +
    '</table>';

  user.sendHtml = sendHtml;
  d.resolve(user);

  return d.promise;
};
