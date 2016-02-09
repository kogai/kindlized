"use strict";

var Book = require('models/Book');
var AddASIN = require('Librarian/AddASIN')();
var InspectKindlize = require('Librarian/InspectKindlize')();

var log = require('common/log');
var util = require('util');

var query = {
  ASIN: [process.argv[2] || "4777935396"]
};


Book.findOne(query, function(err, book){
  if(err){
    return log.info(err);
  }
  AddASIN.lookup(book)
  .then(AddASIN._updates.bind(AddASIN))
  .then(InspectKindlize._inspect.bind(InspectKindlize))
  .then(function(modifiedBook){
    log.info(modifiedBook);
  });
});
