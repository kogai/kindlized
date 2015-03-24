var fetchBookListAmazon = require('test/routes/search/amazon/lib/fetchBookListAmazon');
var handleBookListFromAmazon = require('test/routes/search/amazon/lib/handleBookListFromAmazon');
var searchAuthorityASIN = require('test/routes/search/amazon/lib/searchAuthorityASIN');
var lookUpAuthorityASIN = require('test/routes/search/amazon/lib/lookUpAuthorityASIN');
var saveBookListToDB = require('test/routes/search/amazon/lib/saveBookListToDB');

module.exports = function(){
	fetchBookListAmazon();
	handleBookListFromAmazon();
	searchAuthorityASIN();
	lookUpAuthorityASIN();
	saveBookListToDB();
};
