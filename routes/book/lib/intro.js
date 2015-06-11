"use strict";

var Q = require('q');
var moment = require('moment-timezone');
var ModelBookList = require('models/BookList');
var INTRO = require('common/constant').LIMIT.INTRO;
var periodicalDay = require('common/constant').periodicalDay;
var _ = require('underscore');

module.exports = function( req, res ){
	var query = {
		isKindlized: true,
		images: /.+/,
	};

	var sort = {
		lastModified: -1
	};

	var search = ModelBookList.find( query )
	.sort( sort )
	.limit(INTRO);

	search.exec(function( err, books ){
		res.send(
			books.map(function( book ){
				var images = function(imagesStrings){
					var image = JSON.parse( imagesStrings );
					return image[0].ImageSet[0].MediumImage[0].URL[0];
				};
				return {
					title: book.title[0],
					images: images(book.images),
					url: book.url[0]
				};
			})
		);
	});
};
