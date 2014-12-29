var Authors = require('../models/db.authors.js');

module.exports = function(name){
	var today = new Date();
	var newAuthor = new Authors({
		name: name,
		wroteBooks: 0,
		checkDate: [today]
	});

	newAuthor.save(function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log( 'regist is success' );
		}
	});
}