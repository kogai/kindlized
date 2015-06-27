"use strict"

const User = require('common/User');

module.exports = {
	post: function(req, res){
		let user = User(req.session.passport.user);
		let book = req.body.newBook;

		user.saveBook(book, function(err, savedUser){
			if(err){
	  		res.status(500).send('何か間違いが起こっています。');
			}
			if(typeof savedUser === 'string'){
	  		res.status(500).send(savedUser);
			}
			res.send({
				newBook: book
			});
		});
	},
	
	delete: function(req, res){

	}
}
