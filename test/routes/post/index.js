var fetchBookListAmazon 	= require('./lib/fetchBookListAmazon');
var fetchAuthorListAmazon 	= require('./lib/fetchAuthorListAmazon');

module.exports = function(){
	fetchBookListAmazon();
	fetchAuthorListAmazon();
}
// fetchBookListAmazon();
// fetchAuthorListAmazon();
