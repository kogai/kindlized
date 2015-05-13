var MakeModel = require('common/makeModel');

var AuthorSchema = {
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
	lastModified: Date
};

module.exports = new MakeModel('Author', AuthorSchema);

/*
var mongoose = require('mongoose');
var mongodb = require('util/credential')('mongodb');
var db = mongoose.createConnection(mongodb);

var SequenceSchema = new mongoose.Schema({
  name: String,
  seq: Number
});
SequenceSchema.index = { name: 1 };
var SequenceModel = db.model('Sequence', SequenceSchema );

var CompanySchema = new mongoose.Schema({
  name: {
    type: String,
  	required : true,
    index: {
      unique: true
    }
  },
  industry: String,
  pageId: {
    type: Number,
    index: {
      unique: true
    }
  },
  annualSale: Number,
  numberOfEmployees: Number,
  reputation: [{
    userId: String,
    wageLevel: String,
    workingHours: String,
    holidayWork: Number,
    paidVacationDegestion: Number
  }]
});

CompanySchema.pre('save', function (next) {
  'use strict';
  var company = this;
  var query, options, update;
  if(!company.isNew){
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
      } else {
        return next(err || data);
      }
    };
  })(company));
});

var CompanyModel = db.model('Company', CompanySchema );

module.exports = CompanyModel;
*/
