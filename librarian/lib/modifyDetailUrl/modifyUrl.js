var Q = require('q');
var ModelBookList = require('shelf/lib/modelBookList');

module.exports = function( books ) {
  var d = Q.defer();
  console.log( 'modifyUrl', books.length );

  Q.all(books.map(function(book){
    ModelBookList.findOneAndUpdate({
      // query
      AuthorityASIN: book.AuthorityASIN
    },{
      // modify
      url: book.url,
      isKindlizedUrl: true
    },function(err, book){
      console.log(book);
    });
  }))
  .done(function(){
    d.resolve(books);
  });

  d.resolve(books);
  return d.promise;
};
