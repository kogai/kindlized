var Q = require('q');
var moment = require('moment-timezone');
var modelAuthor = require('author/lib/modelAuthor');

module.exports = function (data) {
  "use strict";
  var d = Q.defer();
  var authors = data.resultArray;

  Q.all(
    authors.map(function(author){
      var def = Q.defer();
      if( author.wroteBooks.lastModified === undefined ){
        author.wroteBooks.recent.publicationNumber = author.publishedBooksCount;
        author.wroteBooks.current.publicationNumber = author.publishedBooksCount;
      }else{
        author.wroteBooks.recent.publicationNumber = author.wroteBooks.current.publicationNumber;
        author.wroteBooks.current.publicationNumber = author.publishedBooksCount;

        var recentCount = author.wroteBooks.recent.publicationNumber;
        var currentCount = author.wroteBooks.current.publicationNumber;
        var isChanged = ( recentCount !== currentCount );
        author.wroteBooks.isChanged = isChanged;
      }
      author.wroteBooks.lastModified = moment();
      def.resolve(author);

      return def.promise;
    })
  )
  .done(function(authors){
    d.resolve(authors);
  });

  return d.promise;
};
