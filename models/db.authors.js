var mongoose = require('mongoose');
var credential = require('../credential');
var db = mongoose.createConnection(ENV['mongodb']);

var authorSchema = new mongoose.Schema({
	name : {
        type : String ,
        index : {
            unique: true 
        }
	},
	wroteBooks : Number,
    checkDate : Array
});

Authors = db.model('Authors', authorSchema);
module.exports = Authors;