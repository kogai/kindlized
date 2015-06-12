"use strict";

var Q = require('q');

var modifyAmazonBook = require('common/modifyAmazonBook');
var log = require('common/log');

module.exports = function(data){
  var d = Q.defer();
  var bookListInAmazon = data.bookListInAmazon;

  Q.all(bookListInAmazon.map(modifyAmazonBook))
  .done(function(modBookListForDB){
    data.bookListInAmazon = modBookListForDB;
    d.resolve(data);
  });

  return d.promise;
};
