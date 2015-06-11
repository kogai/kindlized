"use strict";

var mongoose = require('mongoose');
var mongodb = require('common/makeCredential')('mongodb');

var modelUser = require('models/lib/modelUser');
var comparePassword = require('models/lib/comparePassword');
var hashPassword = require('models/lib/hashPassword');

modelUser.methods.comparePassword = comparePassword;
modelUser.pre('save', hashPassword);

var db = mongoose.createConnection(mongodb);
var newModel = db.model('User', modelUser);

module.exports = newModel;
