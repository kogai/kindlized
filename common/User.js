"use strict";

const _ = require('underscore');
const log = require('common/log');

class User {
	constructor(userId){
		this.userId = userId;
		this.Series = require('Librarian/Series');
		this.UserCollections = require('models/User');
		this.BookCollections = require('models/Book');
	}

	/**
	@param { Object } book - kindle化メールの受信登録する書籍
	@param { Function } done - 完了後に呼ばれるコールバック関数
	**/
	saveBook(book, done){
		let conditions = { _id: this.userId };
		let newBook = {
			bookId: book._id,
			title: book.title,
			isNotified: false
		};
		let updates = {
			$push: {
				bookList: newBook
			}
		};
		let options = {
			upsert: true
		};

		this.UserCollections.findOne(conditions, function(err, user){
			if(err){
				return done(err);
			}
			
			if(_.where(user.bookList, newBook).length > 0){
				return done(null, 'この書籍は登録済みです。');
			}

			this.UserCollections.findOneAndUpdate(conditions, updates, options, function(err, savedUser){
				if(err){
					return done(err);
				}
				done(null, savedUser);
			});
		});
	}

	saveSeries(seriesKeyword){

	}

	fetchRegisteredBooks(){

	}

	fetchRegisteredSeries(){

	}
}
