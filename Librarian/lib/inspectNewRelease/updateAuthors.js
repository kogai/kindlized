var Q = require('q');
var modelAuthor = require('models/Author');;

module.exports = function (authors) {
  "use strict";
  var d = Q.defer();

	Q.all(
		authors.map(function (author) {
			var def = Q.defer();

			var query = {
				_id: author._id
			};
			var modify = {
				wroteBooks: author.wroteBooks
			};
			var callback = function (error, author) {
				if(error){
					def.reject(error);
				}else{
					def.resolve(author);
				}
			};
			modelAuthor.findOneAndUpdate(query, modify, callback);

			return def.promise;
		})
	)
	.fail(function (error) {
		d.reject(error);
	})
	.done(function (modAuthors) {
		d.resolve(modAuthors);
	});

  return d.promise;
};
