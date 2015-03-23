var Q = require('q');
var modelBookList = require('shelf/lib/modelBookList');
var log = require('common/log');
var escape = require('escape-regexp');

module.exports = function(data) {
	var d = Q.defer();

	var req = data.req;
	var newBook = req.body.newBook;
	newBook = escape(newBook);
	var titleQuery = new RegExp( newBook );
	log.info(newBook);

	modelBookList.find({
		title: titleQuery
	}, function(err, bookListInDB) {
		if (err){
			log.info(err);
		}

		var countBooks = bookListInDB.length;
		data.isNewBook = false;

		// modelBookListの検索結果が0冊なら
		// 新しい書籍としてDBに登録するためのフラグを立てる
		if (countBooks === 0) {
			data.isNewBook = true;
		}
		log.info(bookListInDB);
		data.newBook = newBook;
		data.titleQuery = titleQuery;
		data.bookListInDB = bookListInDB;
		d.resolve(data);
	});
	return d.promise;
};
