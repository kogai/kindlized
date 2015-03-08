var mongoose    = require('mongoose');
var mongodb;

if( process.env.mongoose ){
  mongodb = process.env.mongoose;
}else{
  var credential  = require('../../credential');
  mongodb = credential.mongodb;
}

var db = mongoose.createConnection( mongodb );

var booksSchema = new mongoose.Schema({
    status          : String,
    ASIN            : Array,
    EAN             : Array,
    author          : Array,
    title           : Array,
    publisher       : Array,
    publicationDate : Array,
    price           : Array,
    url             : Array,
    images          : String,
    is_kindlized    : Boolean
});

module.exports = db.model( 'BookList', booksSchema );
