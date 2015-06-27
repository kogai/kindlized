"use strict";

var MakeModel = require('common/makeModel');

var bookrSchema = {
  ASIN: {
    type: Array,
    index: {
      unique: true
    }
  },
  AuthorityASIN: Array,
  author: Array,
  title: Array,
  publisher: Array,
  publicationDate: Array,
  price: Array,
  url: Array,
  images: String,
	modifiedLog: {
		AddBookAt: Date,
		InspectKindlizeAt: Date,
		AddASINAt: Date,
		RepairImgAt: Date,
		UpdateUrlAt: Date
	},
  isKindlized: Boolean,
  isKindlizedUrl: Boolean
};

module.exports = new MakeModel('Book', bookrSchema);
