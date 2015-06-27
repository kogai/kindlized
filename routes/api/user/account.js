"use strict"

const User = require('common/User');
const log = require('common/log');

module.exports = {
	put: function(req, res){
		let user = User(req.session.passport.user);
		let property = req.body.property;
		let data = req.body.data;

		user.modifiyProfile(property, data, function(err, savedUser){
			if(err){
	  		return res.status(500).send('何か間違いが起こっています。');
			}
			res.status(200).send(property + 'の編集に成功しました。')
		})
	}
}
