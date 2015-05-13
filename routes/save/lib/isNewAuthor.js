var Q = require('q');
var modelAuthor = require('models/Author');;

module.exports = function (data) {
	"use strict";
	var d = Q.defer();

	modelAuthor.find({
		name: data.book.author
	},function ( err, authors ) {
		if( err ){
			d.reject(err);
		}else{
			data.authors = authors.map( function (author) {
				return author._id.toString();
			});
			d.resolve(data);
		}
	});

	return d.promise;
};
