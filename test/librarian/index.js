var fetchBookList = require( 'test/librarian/lib/fetchParentASIN/fetchBookList' );
var inspectBook 	= require( 'test/librarian/lib/inspectBookList/inspectBook' );

module.exports = {
	fetchParentASIN: {
		fetchBookList: fetchBookList
	},
	inspectBookList: {
		inspectBook	: inspectBook
	}
};
