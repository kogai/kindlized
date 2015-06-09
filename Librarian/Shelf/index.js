"use strict";

var Q = require('q');

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');

var fetchAuthor = require('Librarian/Shelf/lib/fetchAuthor');

var updateAuthorModifiedTime = require('Librarian/Shelf/lib/updateAuthorModifiedTime');
var fetchPageCount = require('Librarian/Shelf/lib/fetchPageCount');
var fetchBookList = require('Librarian/Shelf/lib/fetchBookList');
var modifyBookList = require('Librarian/Shelf/lib/modifyBookList');
var saveBookList = require('Librarian/Shelf/lib/saveBookList');

var handleAuthorData = function(author){
	var d = Q.defer();

	// シーケンシャルに処理する非同期処理
	Q.when(author)
	.then(updateAuthorModifiedTime)
	.then(fetchPageCount)
	.then(fetchBookList)
	.then(modifyBookList)
	.then(saveBookList)
	.then(function(author){
		log.info(author.name + ' : ' + author.pageCount + 'ページ分' + 'の処理を完了');
	})
	.fail(function(result){
		log.info(result.err);
		log.info(result.author.name + ' : ' + 'の処理が失敗');
	})
	.done(function() {
		d.resolve();
	});

	return d.promise;
};

function Shelf(){
	return this;
}

Shelf.prototype.run = function(callback){
	fetchAuthor()
	.done(function(authors){
		if(authors.length === 0){ return callback(); }
		promiseSerialize(authors, handleAuthorData)
		.done(function(){
			return callback();
		});
	});
};

Shelf.prototype.cron = function(){
	var d = Q.defer();

	this.run(function(){
		d.resolve();
	});

	return d.promise;
};

module.exports = function(){
	return new Shelf();
};
