var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');

module.exports = function (authors) {
    'use strict';
    /*
    Handler本体
    */
    var d = Q.defer();

    Q.all(
      authors.map( function (author) {
        var def = Q.defer();

        modelBookList.find({author: author.name},function (error, books) {
          if(error){
            def.reject(error);
          }else{
            author.publicationNumber = books.length;
            author.publicationBooks = books.map(function(book){
              return book._id.toString();
            });
            def.resolve(author);
          }
        });

        return def.promise;
      })
    )
    .done(function (modAuthors) {
        d.resolve(modAuthors);
    });

    return d.promise;
};
