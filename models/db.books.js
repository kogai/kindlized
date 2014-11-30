var mongoose = require('mongoose');
var credential = require('../credential');
var db = mongoose.createConnection(credential.mongodb);

var booksSchema = new mongoose.Schema({
    title : String ,
    imgUrl : String,
    author : String,
    publisher : String,
    ASIN : String,
    DetailPageURL : String,
    value : Number,
    is_kindlized : Boolean,
    votedId : Array,
    checkDate : Array
});

Books = db.model('Books', booksSchema);
module.exports = Books;

	// type : String ,
	// // required : true ,
	// index : {
    // 	unique: true 
	// }