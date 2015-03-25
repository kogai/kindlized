var fetchBookList = require( 'test/librarian/lib/fetchParentASIN/fetchBookList' );
var inspectASIN 	= require( 'test/librarian/lib/fetchParentASIN/inspectASIN' );

var inspectBook 	= require( 'test/librarian/lib/inspectBookList/inspectBook' );

// fetchBookList();
inspectASIN();

module.exports = {
	fetchParentASIN: {
		fetchBookList: fetchBookList,
		inspectASIN: inspectASIN
	},
	inspectBookList: {
		inspectBook	: inspectBook
	}
};
