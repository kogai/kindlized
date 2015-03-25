var fetchBookList = require( 'test/librarian/lib/fetchParentASIN/fetchBookList' );
var inspectASIN 	= require( 'test/librarian/lib/fetchParentASIN/inspectASIN' );

module.exports = function(){
	fetchBookList();
	inspectASIN();
};
