var Q = require('q');
var inspectNewPublishedBooks = require('librarian/lib/addNewRelease/inspectNewPublishedBooks');

module.exports = function (users) {
	'use strict';
	var d = Q.defer();

  Q.all(
		users.map(inspectNewPublishedBooks)
	)
  .done( function(){
     d.resolve();
  });

	return d.promise;
};
