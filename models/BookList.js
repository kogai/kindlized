"use strict";

var MakeModel = require('common/makeModel');

var bookrSchema = {
  status: String,
  ASIN: {
    type: Array,
    index: {
      unique: true
    }
  },
  AuthorityASIN: Array,
  EAN: Array,
  author: Array,
  title: Array,
  publisher: Array,
  publicationDate: Array,
  price: Array,
  url: Array,
  images: String,
  lastModified: Date,
	modifiedLog: {
		AddBookAt: Date,
		InspectKindlizeAt: Date,
		AddASINAt: Date,
		UpdateUrlAt: Date
	},
  isKindlized: Boolean,
  isKindlizedUrl: Boolean
};

module.exports = new MakeModel('BookList', bookrSchema);
