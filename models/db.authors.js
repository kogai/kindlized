var mongoose = require('mongoose');
var credential = require('../credential');
var db = mongoose.createConnection(credential.mongodb);

var authorSchema = new mongoose.Schema({
	name : String,
	bookCount : Number,
    checkDate : Array
});

Authors = db.model('Authors', authorSchema);
module.exports = Authors;