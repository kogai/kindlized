const log = require('common/log')
const Book = require('models/Book')
const bookInstanse = require('common/Book')()
const mock = require('./mock')

Book.findOne({ ASIN: '4048652184' }, function(err, book){
	if(err){
		return log.info(err)
	}
	log.info(bookInstanse.sanitizeForClient(book))
})
