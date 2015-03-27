var Q = require('q');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var handlePromiseSerialize = require('librarian/lib/fetchParentASIN/handlePromiseSerialize');
var updateBooks = require('librarian/lib/fetchParentASIN/updateBooks');

module.exports = function(){
  var defferd = Q.defer();
  Q.when()
  .then(fetchBookList)
  .then(handlePromiseSerialize)
  .then(updateBooks)
  .done(function(){
    defferd.resolve();
  });
  return defferd.promise;
};
