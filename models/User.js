"use strict";

var mongoose = require('mongoose');
var mongodb = require('common/makeCredential')('mongodb');

/**
@example
{
  mail: "kogai0121@gmail.com",
  password: '',
  verifyId: '',
  isVerified: true,
  bookList: [],
  seriesList: [{
    _id: 'foobarbuzz',
    seriesKeyword: '我が愛しのヲタ彼女',
		lastModified: { "$date": "2015-06-01T04:00:00.000Z" }
  }]
}
**/
var modelUser = require('models/lib/modelUser');
var comparePassword = require('models/lib/comparePassword');
var hashPassword = require('models/lib/hashPassword');

modelUser.methods.comparePassword = comparePassword;
modelUser.pre('save', hashPassword);

var db = mongoose.createConnection(mongodb);
var newModel = db.model('User', modelUser);

module.exports = newModel;
