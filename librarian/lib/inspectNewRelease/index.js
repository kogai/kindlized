var Q = require('q');
var moment = require('moment-timezone');
var periodicalDay = require('common/constant').periodicalDay;
var promiseSerialize = require('common/promiseSerialize');
var modelAuthor = require('models/Author');;

var fetchAuthors = require('librarian/lib/inspectNewRelease/fetchAuthors');
var inspectPublishedBooks = require('librarian/lib/inspectNewRelease/inspectPublishedBooks');
var modifyAuthors = require('librarian/lib/inspectNewRelease/modifyAuthors');
var updateAuthors = require('librarian/lib/inspectNewRelease/updateAuthors');

module.exports = function(){
  "use strict";
  var handleFails = function (error) {
    var d = Q.defer();

    d.resolve(error);

    return d.promise;
  };
  var deferd = Q.defer();
  Q.when()
  .then(fetchAuthors)
  .then(inspectPublishedBooks)
  .then(modifyAuthors)
  .then(updateAuthors)
  .fail(handleFails)
  .done(function () {
    deferd.resolve();
  });
  return deferd.promise;
};
