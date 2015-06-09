"use strict";

var Q = require('q');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var handlePromiseSerialize = require('librarian/lib/fetchParentASIN/handlePromiseSerialize');
var updateBooks = require('librarian/lib/fetchParentASIN/updateBooks');
var log = require('common/log');

module.exports = function(){
  var defferd = Q.defer();
  Q.when()
  .then(fetchBookList)
  .then(handlePromiseSerialize)
  .then(updateBooks)
  .fail(erroHandling)
  .done(function(){
    log.info('AuthorityASINの調査処理が完了');
    defferd.resolve();
  });
  return defferd.promise;
};

var erroHandling = function(){
  log.info('AuthorityASINのエラーハンドリング');
  var d = Q.defer();
  d.resolve();
  return d.promise;
};
