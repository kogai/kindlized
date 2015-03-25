var fetchBookList = require( 'test/librarian/lib/fetchParentASIN/fetchBookList' );
var lookUpAuthorityASIN = require( 'test/librarian/lib/fetchParentASIN/lookUpAuthorityASIN' );
// var inspectASIN 	= require( 'test/librarian/lib/fetchParentASIN/inspectASIN' );

module.exports = function(){
	fetchBookList();
	lookUpAuthorityASIN();
	// inspectASIN();
};
