var fetchBookList = require( 'test/librarian/lib/fetchParentASIN/fetchBookList' );
var fetchBookList = require( 'test/librarian/lib/inspectBookList/siftBookList' );
module.exports = {
	fetchParentASIN: {
		fetchBookList: fetchBookList
	},
	inspectBookList: {
		siftBookList: siftBookList
	}
};
