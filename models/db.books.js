var mongoose = require('mongoose');
var credential = require('../credential');
var db = mongoose.createConnection(credential.mongodb);

var booksSchema = new mongoose.Schema({
    title : String ,
    imgUrl : String,
    is_kindlized : Boolean,
    votedId : Array,
    checkDate : Array
});

Books = db.model('Books', booksSchema);
module.exports = Books;