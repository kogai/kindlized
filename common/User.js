"use strict"

const _ = require('underscore')
const log = require('common/log')

class User {
	constructor(userId){
		this.userId = userId
		this.Series = require('Librarian/Series')
		this.UserCollections = require('models/User')
		this.BookCollections = require('models/Book')
	}

	/**
	@param { Object } book - kindle化メールの受信登録する書籍
	@param { Function } done - 完了後に呼ばれるコールバック関数
	**/
	saveBook(book, done){
		let _self = this
		let conditions = { _id: this.userId }
		let newBook = {
			bookId: book._id,
			title: book.title[0],
			isNotified: false
		}
		let updates = {
			$push: {
				bookList: newBook
			}
		}
		let options = {
			upsert: true
		}

		this.UserCollections.findOne(conditions, function(err, user){
			if(err){
				return done(err)
			}

			if(_.where(user.bookList, newBook).length > 0){
				return done(null, 'この書籍は登録済みです。')
			}

			_self.UserCollections.findOneAndUpdate(conditions, updates, options, function(err, savedUser){
				if(err){
					return done(err)
				}
				done(null, savedUser)
			})
		})
	}

	reduceBook(book, done){

	}

	saveSeries(seriesKeyword){

	}

	fetchRegisteredBooks(){

	}

	fetchRegisteredSeries(){

	}


	/**
	@param { String } property - 編集するプロパティ名
	@param { String | Array | Object } data - 編集するデータ
	@param { Function } done - 完了後に呼ばれるコールバック関数
	**/
	modifiyProfile(property, data, done){
		let conditions = { _id: this.userId }
		let updates = {}
		updates[property] = data
		let options = {
			upsert: true
		}

		this.UserCollections.findOneAndUpdate(conditions, updates, options, function(err, savedUser){
			if(err){
				return done(err)
			}
			done(null, savedUser)
		});

	}
}

module.exports = function(userId){
	return new User(userId)
}
