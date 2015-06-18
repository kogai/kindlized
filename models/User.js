"use strict";

var mongoose = require('mongoose');
var mongodb = require('common/makeCredential')('mongodb');
var db = mongoose.createConnection(mongodb);

var Q = require('q');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = require('common/constant').SALT_WORK_FACTOR;
var Utils = require('common/Utils');

/**
@example
{
  mail: "kogai0121@gmail.com",
  password: '',
  verifyId: '',
  isVerified: true,
  bookList: [],
  modifiedLog: [
    seriesListAt: { "$date": "2015-06-01T04:00:00.000Z" }
  ],
  seriesList: [{
    _id: 'foobarbuzz',
    seriesKeyword: '我が愛しのヲタ彼女',
  }]
}
**/

var UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  verifyId: String,
  isVerified: Boolean,
  bookList: Array,
  seriesList: Array,
	modifiedLog: {
		seriesListAt: Date
	}
});

UserSchema.methods.comparePassword = function(candidatePassword, hashedPassword, done) {
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) {
      return done(err);
    }
    done(null, isMatch);
  });
};



UserSchema.pre('save', function(next) {
	var _user = this;

	// only hash the password if it has been modified (or is new)
	if (!_user.isModified('password')){
    return next();
  }

	var generateSalt = function() {
		var d = Q.defer();
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if(err){
        return next(err);
      }

			d.resolve(salt);
		});
		return d.promise;
	};

	var hashPassword = function(salt) {
		var d = Q.defer();
		bcrypt.hash(_user.password, salt, function(err, hash) {
			if (err){
        return next(err);
      }

			_user.password = hash;
			d.resolve(hash);
		});
		return d.promise;
	};

	generateSalt()
	.then(hashPassword)
	.done(function(hash) {
		next();
	});
});

module.exports = db.model('user', UserSchema);
