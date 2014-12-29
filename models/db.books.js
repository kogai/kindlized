var mongoose = require('mongoose');
// var credential = require('../credential');
var db = mongoose.createConnection(process.env['mongodb']);

var booksSchema = new mongoose.Schema({
    title : String ,
    img : Object,
    author : String,
    publisher : String,
    ASIN : String,
    DetailPageURL : String,
    DetailPageURL_kindle : String,
    price : String,
    is_kindlized : Boolean,
    votedId : Array,
    checkDate : Array
});

Books = db.model('Books', booksSchema);
module.exports = Books;

