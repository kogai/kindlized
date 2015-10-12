"use strict";

var escape = require('escape-regexp');

var BookList = require('models/Book');
var log = require('common/log');

module.exports = function(req, res){
  var query = escape(req.query.query);
  var queryRegExp = new RegExp(query);

  var conditions = {
    title: queryRegExp
  };

  BookList.find(conditions, function(err, books){
    if(err){
      return log.info(err);
    }
    res.send(books);
  });
};
