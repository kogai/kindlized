"use strict";

var _ = require('underscore');

var Operator = require('common/Operator');
var BookCollector = require('common/Collector')('book');
var AuthorCollector = require('common/Collector')('author');

var log = require('common/log');

module.exports = function(req, res){
	var query = req.query.query;
	var searchOperator = Operator({
		type: "Title",
		query: query
	});

	searchOperator.run(function(err, books){
		if(books){
			return res.send(books);
		}
		res.send([]);

		// 書籍の登録処理
		BookCollector.saveCollections(books, function(err, savedBooks){
			if(err){
				return log.info(err);
			}
			if(savedBooks.length === 0){
				return log.info('新しく登録した書籍はありません');
			}
			log.info(savedBooks);
		});

		// 著者の登録処理
		var authors = books.map(function(book){
			return book.author[0];
		});

		authors = _.uniq(authors);
		authors = _.compact(authors);

		AuthorCollector.saveCollections(authors, function(err, savedAuthors){
			if(err){
				return log.info(err);
			}
			if(savedAuthors.length === 0){
				return log.info('新しく登録した著者はいません');
			}
			log.info(savedAuthors);
		});
	});
};
