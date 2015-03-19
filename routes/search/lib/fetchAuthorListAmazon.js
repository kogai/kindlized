var Q = require('q');
var _ = require('underscore');

module.exports = function(data) {
  var d = Q.defer();

  var bookListInAmazon = data.bookListInAmazon;
  var authorListInAmazon = [];

  for (var i = 0; i < bookListInAmazon.length; i++) {
    var author = bookListInAmazon[i].author;
    authorListInAmazon.push(author);
  }
  authorListInAmazon = _.uniq(authorListInAmazon);

  data.authorListInAmazon = authorListInAmazon;
  d.resolve(data);

  return d.promise;
};
