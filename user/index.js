var mongoose        = require('mongoose');
var mongodb;
var modelUser       = require ('user/lib/modelUser');
var comparePassword = require ('user/lib/comparePassword');
var hashPassword    = require ('user/lib/hashPassword');

modelUser.methods.comparePassword = comparePassword;
modelUser.pre( 'save', hashPassword );

if (process.env.mongodb || process.env.CI ) {
    mongodb = process.env.mongodb;
} else {
    var credential = require('../credential');
    mongodb = credential.mongodb;
}

var db = mongoose.createConnection( mongodb );
var newModel = db.model( 'User', modelUser );

module.exports = newModel;
