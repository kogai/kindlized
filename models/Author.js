'use strict';

var mongoose = require('mongoose');
var mongodb = require('common/makeCredential')('mongodb');

var db = mongoose.createConnection(mongodb);

var AuthorSchema = new mongoose.Schema({
	name: {
		type: String,
		index: {
			unique: true
		}
	},
	wroteBooks: {
		lastModified: Date,
		isChanged: Boolean,
		recent: {
			publicationBooks: Array,
			publicationNumber: Number
		},
		current: {
			publicationBooks: Array,
			publicationNumber: Number
		}
	},
	lastModified: Date,
	haveId: Boolean,
  pageId: Number
});

var SequenceSchema = new mongoose.Schema({
  name: String,
  seq: Number
});

SequenceSchema.index = { name: 1 };
var SequenceModel = db.model('Sequence', SequenceSchema );

AuthorSchema.pre('save', function (next) {
  var author = this;
  var query, options, update;
  if(!author.isNew){
    return next();
  }
  query = {
  };
  update = {
    $inc: {
      seq: 1
    }
  };
  options = {
    upsert: true
  };
  return SequenceModel.findOneAndUpdate(query, update, options, (function(_this) {
    return function(err, data) {
      if (!err && data) {
        _this.pageId = data.seq;
        return next();
      }
      return next(err || data);
    };
  }(author)));
});

module.exports = db.model('Author', AuthorSchema );
