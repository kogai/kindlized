var mongoose = require('mongoose');
if(process.env.mongoose){
    mongodb = process.env.mongoose;
}else{
    var credential = require('../credential');
    mongodb = credential.mongodb;
}
var db = mongoose.createConnection(mongodb);

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

