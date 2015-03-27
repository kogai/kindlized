var Q = require('q');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var handlePromiseSerialize = require('librarian/lib/fetchParentASIN/handlePromiseSerialize');
var updateBooks = require('librarian/lib/fetchParentASIN/updateBooks');
var logWrap = require('common/logWrap')( 'librarian', true );

module.exports = function(){
  var defferd = Q.defer();
  Q.when()
  .then(fetchBookList)
  .then(handlePromiseSerialize)
  .then(updateBooks)
  .fail(erroHandling)
  .done(function(){
    logWrap.info('AuthorityASINの調査処理が完了');
    defferd.resolve();
  });
  return defferd.promise;
};

var erroHandling = function(){
  console.log('AuthorityASINのエラーハンドリング');
  var d = Q.defer();
  d.resolve();
  return d.promise;
};
