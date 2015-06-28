"use strict"

const log = require('common/log')
const User = require('common/User')
const Book = require('common/Book')()

module.exports = {
	get: function(req, res){
		if(!req.session.passport.user){
			return res.status(500).send()
		}
		let user = User(req.session.passport.user)
		let page = Number(req.query.page)

		user.fetchRegisteredBooks(function(err, bookList){
			if(err){
				return log.info(err)
			}

			let conditions = {
				_id: { $in: bookList.map(function(book){ return book.bookId }) }
			}
			if(page){
				// クエリパラメータにpageの指定があればそのページを返す
				Book.fetchPage(conditions, page, function(err, books, hasNext){
					if(err){
						return log.info(err)
					}
					res.send({
						maxCount: bookList.length,
						books: books.map(function(book){
							return Book.sanitizeForClient(book)
						}),
						hasNext: hasNext
					})
				})
			}else{
				// クエリパラメータがなければ全件を返す
				Book.fetchAll(conditions, function(err, books){
					if(err){
						return log.info(err)
					}
					res.send({
						maxCount: bookList.length,
						books: books.map(function(book){
							return Book.sanitizeForClient(book)
						})
					})
				})
			}
		})
	},

	post: function(req, res){
		if(!req.session.passport.user){
			return res.status(500).send()
		}
		let user = User(req.session.passport.user)
		let book = req.body.newBook

		user.saveBook(book, function(err, savedUser){
			if(err){
				return log.info(err)
			}
			if(typeof savedUser === 'string'){
				return log.info(savedUser)
			}
			res.send({
				newBook: book
			})
		})
	},

	delete: function(req, res){
		if(!req.session.passport.user){
			return res.status(500).send()
		}
		let user = User(req.session.passport.user)
		let deleteBookId = req.query.deleteBookId
		user.reduceBook(deleteBookId, function(err, savedUser){
			if(err){
				return log.info(err)
			}
			res.status(200).send('書籍がメール通知リストから削除されました。')
		})
	}
}
