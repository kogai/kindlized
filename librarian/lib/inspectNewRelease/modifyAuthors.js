var Q = require('q');
var moment = require('moment-timezone');
var modelAuthor = require('author/lib/modelAuthor');

module.exports = function (authors) {
  "use strict";
  var d = Q.defer();

  Q.all(
    authors.map(function(author){
      var def = Q.defer();
      if( author.wroteBooks.lastModified === undefined ){
        author.wroteBooks.recent.publicationNumber = author.publicationNumber;
        author.wroteBooks.recent.publicationBooks = author.publicationBooks;
        author.wroteBooks.isChanged = false;
      }else{
        author.wroteBooks.recent.publicationNumber = author.wroteBooks.current.publicationNumber;
        author.wroteBooks.recent.publicationBooks = author.wroteBooks.current.publicationBooks;

        var recentCount = author.wroteBooks.recent.publicationNumber;
        var currentCount = author.wroteBooks.current.publicationNumber;
        var isChanged = ( recentCount !== currentCount );
        author.wroteBooks.isChanged = isChanged;
      }
      author.wroteBooks.current.publicationNumber = author.publicationNumber;
      author.wroteBooks.current.publicationBooks = author.publicationBooks;
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
