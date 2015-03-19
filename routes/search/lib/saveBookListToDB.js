var Q = require('q');

var modelBookList = require('shelf/lib/modelBookList');
var saveBook      = require('common/saveBook');

module.exports = function( data ) {
  var d = Q.defer();
  var bookListInAmazon = data.bookListInAmazon;

  Q.all( bookListInAmazon.map( saveBook ) )
  .done( function(){
     d.resolve( data );
  });

  return d.promise;
};
