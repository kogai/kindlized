"use strict";

var MakeModel = require('common/makeModel');

var bookrSchema = {
  status: String,
  ASIN: Array,
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
  lastModifiedLogs: {
    fetchParentASIN: Date,
    modifyUrl: Date
  },
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
