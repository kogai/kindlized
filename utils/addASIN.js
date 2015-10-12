"use strict";

var AddASIN = require('Librarian/AddASIN')();

var log = require('common/log');
var util = require('util');

var mocks = {
  title: ["ラクガキノート術"],
  ASIN: ["4777935396"]
};
// B00UR0V4WQ

AddASIN.lookup(mocks)
.done(function(book){
  log.info(util.inspect(book, null, null));
});
