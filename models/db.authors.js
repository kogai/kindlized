var mongoose = require('mongoose');
if(process.env.mongodb){
	mongodb = process.env.mongodb;
}else{
	var credential = require('../credential');
	mongodb = credential.mongodb;
}
var db = mongoose.createConnection(mongodb);

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