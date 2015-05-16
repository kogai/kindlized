"use strict";

var Author = require('models/Author');
var Booklist = require('shelf/lib/modelBookList');
var _ = require('underscore');

module.exports = function(req, res){
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

	var authorId = req.params[0];
	Author.findOne({ pageId: authorId }, function(err, author){
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
					prev: Number(authorId)-1,
					next: Number(authorId)+1
				}
			});
		});
	});
};
