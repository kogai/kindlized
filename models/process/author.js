var saveAuthor = require('../../models/save.authors');
var Mongodb = require('../../models/db.user.js');

module.exports = function (req, res) {
	// 書籍DB側にユニークな著者名を登録
    saveAuthor(req.body.authorRegist);

    // ユーザーのDBに著者名を登録
    Mongodb.User.findOne( { "_id": req.session.passport.user }, function(err, user){
		if(err) console.log(err);
		user.sendBooks.push({
			author: req.body.authorRegist
		});
		user.save();
    });
    res.redirect( 303, '/');
};