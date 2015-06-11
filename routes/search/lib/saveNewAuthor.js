"use strict";

var Q = require('q');
var _ = require('underscore');

var saveAuthor = require('common/saveAuthor');

module.exports = function(data) {
  var d = Q.defer();
  var authorListInAmazon = data.authorListInAmazon;
  var authorsStore = [];

	/*
	[ 'foo', 'bar' ]のように、複数著者がいる場合があるので、concatしておく
	*/
  var i;
  for (i = 0; i < authorListInAmazon.length; i++) {
    authorsStore = authorsStore.concat(authorListInAmazon[i]);
    authorsStore = _.uniq(authorsStore);
  }

	Q.all( authorsStore.map(
		function( author, index, authorList ){
			saveAuthor( author );
		})
	)
	.done( function(){
		d.resolve( data );
	});

  return d.promise;
};
