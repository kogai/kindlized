var Q		 = require('q');

module.exports = function( bookList ){
	console.log( 'ASINを持つ書籍は', bookList.length );
    var d = Q.defer();

	var siftedBookList = [];
	for (var i = 0; i < bookList.length; i++) {

        var hasAuthorityASIN = ( function( AuthorityASIN ){
            var authorityASINState = false;
            if( AuthorityASIN.length > 0 ) authorityASINState = true;
            return authorityASINState;
        })( bookList[i].AuthorityASIN );

        if( hasAuthorityASIN ){
	        siftedBookList.push( bookList[i] );
        }
	}
	console.log( 'AuthorityASINを持つ書籍は', siftedBookList.length );
    d.resolve( siftedBookList );
    return d.promise;
};
