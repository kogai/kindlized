"use strict"

const log = require('common/log')
const Book = require('common/Book')()
const User = require('common/User')('55098ed6c0fa27f716c0717e')

User.fetchRegisteredBooks(function(err, bookList){
	if(err){
		return log.info(err)
	}
	let conditions = {
		_id: {
			$in: bookList.map(function(book){
				return book.bookId
			})
		}
	}
	Book.fetchPage(conditions, 1, function(err, books, hasNext){
		if(err){
			return log.info(err)
		}
		books.map(function(book){
			return log.info(book.title)
		})
		log.info(hasNext)
	})
})
