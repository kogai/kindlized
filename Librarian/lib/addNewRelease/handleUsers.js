var Q = require('q');
var inspectNewPublishedBooks = require('librarian/lib/addNewRelease/inspectNewPublishedBooks');

module.exports = function (users) {
	'use strict';
	var d = Q.defer();

  Q.all(
		users.map(inspectNewPublishedBooks)
	)
  .done( function(users){
     d.resolve(users);
  });

	return d.promise;
};
