var mongoose = require('mongoose');
var mongodb;

module.exports = function( modelName, modelSchema ){
  if (process.env.mongodb || process.env.CI ) {
    mongodb = process.env.mongodb;
  } else {
    var credential = require('../credential');
    mongodb = credential.mongodb;
  }
  var db          = mongoose.createConnection( mongodb );
  var makeSchemma = new mongoose.Schema( modelSchema );
  var newModel    = db.model( modelName, makeSchemma );
  return newModel;
};
