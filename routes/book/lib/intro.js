var Q = require('q');
var moment = require('moment-timezone');
var ModelBookList = require('shelf/lib/modelBookList');
var limitIntro = require('common/constant').limitIntro;
var periodicalDay = require('common/constant').periodicalDay;
var _ = require('underscore');

module.exports = function( req, res ){
	var query = {
		isKindlized: true
	};

	var sort = {
		lastModified: -1
	};

	var search = ModelBookList.find( query )
	.sort( sort )
	.limit( limitIntro );

	search.exec(function( err, books ){
		res.send(
			books.map(function( book ){
				var images = function(imagesStrings){
					image = JSON.parse(imagesStrings);
					try{
						images = image[0].ImageSet[0].MediumImage[0].URL[0];
					}catch(e){
						images = "";
					}finally{
						return images;
					}
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
