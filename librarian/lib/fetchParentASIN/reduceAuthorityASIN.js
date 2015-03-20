var Q = require('q');

module.exports = function(bookList) {
  var d = Q.defer();

  var siftedBookList = [];
  for (var i = 0; i < bookList.length; i++) {

    var checkHasAuthorityASIN = function(AuthorityASIN) {
      var authorityASINState = false;
      if (AuthorityASIN.length > 0) authorityASINState = true;
      return authorityASINState;
    };
		var hasAuthorityASIN = checkHasAuthorityASIN( bookList[i].AuthorityASIN );

    if ( !hasAuthorityASIN ) {
      siftedBookList.push(bookList[i]);
    }
  }
  console.log('AuthorityASINを持たない書籍は', siftedBookList.length);
  d.resolve(siftedBookList);
  return d.promise;
};
