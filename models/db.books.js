var mongoose = require('mongoose');
var credential = require('../credential');
var db = mongoose.createConnection(credential.mongodb);

var booksSchema = new mongoose.Schema({
    title : String ,
    imgUrl : String,
    is_kindlized : Boolean,
    votedId : Array
});

Books = db.model('Books', userSchema);
module.exports = Books;