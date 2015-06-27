"use strict"

const log = require('common/log')

class Book{
	constructor(){
		this.itemPerPage = 10
		this.UserCollections = require('models/User')
		this.BookCollections = require('models/Book')
	}

	fetchPage(conditions, page, done){
		var _self = this;
		var pageIndex = page - 1;

		var query = this.BookCollections
		.find(conditions)
		.sort({ _id: -1 })
		.skip(pageIndex * this.itemPerPage)
		.limit(this.itemPerPage + 1);

		query.exec(function(err, items){
			if(err){
				return done(err);
			}

			var hasNext = false;
			var lastIndex = items.length - 1;

			if(items.length > _self.itemPerPage){
				hasNext = true;
				items = items.slice(0, lastIndex);
			}

			done(null, items, hasNext);
		});
	}

	fetchAll(done){

	}

	sanitizeForClient(book){
		let sanitizedBook = {
			_id: book._id,
			url: book.url[0],
			isKindlized: book.isKindlized
		}
		let images
		try{
			images = JSON.parse(book.images)
			images = images[0].ImageSet[0].MediumImage[0].URL[0]
		}catch(e){
			images = '/images/book_blank.png'
		}
		sanitizedBook.images = images
		return sanitizedBook
	}
}

module.exports = function(){
	return new Book()
}
