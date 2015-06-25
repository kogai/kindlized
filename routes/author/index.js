"use strict";

var Author = require('models/Author');
var Booklist = require('models/Book');
var _ = require('underscore');
var Q = require('q');

module.exports = function(req, res){
	var isLogined = req.session.passport.user;
	var encodeImgSrc = function(bookList) {
	  return bookList.map(function(book) {
	    var err, images;
	    try {
	      images = JSON.parse(book.images);
	      images = images[0].ImageSet[0].MediumImage[0].URL[0];
	    } catch (_error) {
	      err = _error;
	      images = '';
	    } finally {
	      book.images = images;
	    }
			if(err){
				console.log(err);
				return book;
			}
	    return book;
	  });
	};

	var authorId = Number(req.params[0]);
	var authors = {};

	var countAuthors = function(){
		var d = Q.defer();
		Author.count({}, function(err, count){
			authors.count = count;
			d.resolve(authors);
		});
		return d.promise;
	};

	var getAuthor = function(authorId, index){
		var d = Q.defer();
		Author.findOne({ pageId: authorId }, function(err, author){
			if(err){
				return console.log("err", err);
			}
			authors[index] = author;
			d.resolve(authors);
		});
		return d.promise;
	};

	var getAuthorParallel = function(){
		var authorIds = [
			authorId - 1,
			authorId,
			authorId + 1
		];

		if(authorIds[2] > authors.count){
			authorIds[2] = 1;
		}
		if(authorIds[0] === 0){
			authorIds[0] = authors.count;
		}

		var d = Q.defer();
	  Q.all(authorIds.map(getAuthor))
	  .done(function(authors){
			d.resolve(authors);
		});
		return d.promise;
	};


	var handleAuthorRoute = function(){
		var author = authors['1'];
		var authorPrev = authors['0'];
		var authorNext = authors['2'];
		if(authorPrev === null){
			authorPrev = {
				pageId: null,
				name: null,
				isNotExist: true
			};
		}
		if(authorNext === null){
			authorNext = {
				pageId: null,
				name: null,
				isNotExist: true
			};
		}
		Booklist.find({
			author: author.name
		}, function (err, books) {
			if(err){
				console.log(err);
			}
			books = encodeImgSrc(books);
			var title = author.name + "先生のKindle化された著書";
			res.render( 'author', {
				title : title,
				description: title + "の一覧ページです",
				books: books,
				isLogined: isLogined,
				kindlizedBooks: (function(books){
					books = books.map(function(book){
						if(book.isKindlized){
							return book;
						}
					});
    			books = _.compact(books);
					return books;
				}(books)),
				pager: {
					prev: {
						pageId: authorPrev.pageId,
						name: authorPrev.name,
						isNotExist: authorPrev.isNotExist
					},
					next: {
						pageId: authorNext.pageId,
						name: authorNext.name,
						isNotExist: authorNext.isNotExist
					}
				}
			});
		});
	};

	countAuthors()
	.then(getAuthorParallel)
	.done(handleAuthorRoute);
};
