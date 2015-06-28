"use strict"

const log = require('common/log')

class Book{
	constructor(opts){
		this.itemPerPage = opts.itemPerPage || 10
		this.UserCollections = require('models/User')
		this.BookCollections = require('models/Book')
	}


	/**
	@param { Objcet } conditions
	@param { Number } page
	@param { Function } done - 完了後に呼ばれるコールバック関数
	**/
	fetchPage(conditions, page, done){
		if(typeof conditions === 'number'){
			done = page
			page = conditions
		}
		var _self = this;
		var pageIndex = page - 1;

		var query = this.BookCollections
		.find(conditions)
		.sort({ title: 1 })
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

	fetchAll(conditions, done){
		if(typeof conditions === 'function'){
			done = conditions
		}

		var query = this.BookCollections
		.find(conditions)
		.sort({ title: 1 })

		query.exec(function(err, items){
			if(err){
				return done(err);
			}
			done(null, items);
		});
	}

	sanitizeForClient(book){
		let sanitizedBook = {
			_id: book._id,
			url: book.url[0],
			title: book.title[0],
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

	count(conditions, done){
		if(typeof conditions === 'function'){
			done = conditions
			conditions = {}
		}

		let query = this.BookCollections.find(conditions).count()
		query.exec(function(err, count){
			if(err){
				return done(err)
			}
			done(null, count)
		})
	}
}

module.exports = function(opts){
	let _opts = opts || {}
	return new Book(_opts)
}
