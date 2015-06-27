const log = require('common/log')
const Book = require('common/Book')()

Book.fetchPage({}, 1, function(err, books){
	if(err){
		return log.info(err)
	}
	books.map(function(book){
		return log.info(book.title)
	})
})
