var Q = require('q');
var saveAuthor = require('common/saveAuthor');

module.exports = function(data) {
  var d = Q.defer();
  var authorListInAmazon = data.authorListInAmazon;
  var authorsStore = [];

	/*
	[ 'foo', 'bar' ]のように、複数著者がいる場合があるので、concatしておく
	*/
  for (var i = 0; i < authorListInAmazon.length; i++) {
    var authors = authorListInAmazon[i];
    authorsStore = authorsStore.concat(authors);
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
