"use strict";
var log = require('common/log');
var BookList = require('models/Book');
var Book = require('models/Book');
var limit = 100;

function BatchBookList(){
	this.skip = 100;
	this.Collections = require('models/Book');
}

BatchBookList.prototype.fetch = function(page, done){
	var _self = this;
	var pageIndex = page - 1;

	var query = this.Collections
	.find({})
	.sort({ _id: -1 })
	.skip(pageIndex * this.skip)
	.limit(this.skip + 1);

	query.exec(function(err, items){
		if(err){
			return done(err);
		}

		var hasNext = false;
		var lastIndex = items.length - 1;

		if(items.length > _self.skip){
			hasNext = true;
			items = items.slice(0, lastIndex);
		}

		done(null, items, hasNext);
	});
};

var batch = new BatchBookList();

var page = 1;
var fetchRecursive = function(err, items, hasNext){
	if(err){
		return log.info(err);
	}
	if(hasNext){
		page++;
		batch.fetch(page, fetchRecursive);
	}else{
		log.info('all is done.');
	}

	items.forEach(function(book){
		var newBook = new Book(book);
		newBook.save(function(err){
			if(err){
				log.info(err);
			}
			log.info(newBook.title);
		});
	});
};

batch.fetch(page, fetchRecursive);
