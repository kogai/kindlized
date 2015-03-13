var fetchBookList = require( 'test/librarian/lib/fetchParentASIN/fetchBookList' );
var siftBookList 	= require( 'test/librarian/lib/inspectBookList/siftBookList' );
var inspectBook 	= require( 'test/librarian/lib/inspectBookList/inspectBook' );

module.exports = {
	fetchParentASIN: {
		fetchBookList: fetchBookList
	},
	inspectBookList: {
		siftBookList: siftBookList,
		inspectBook	: inspectBook
	}
};
