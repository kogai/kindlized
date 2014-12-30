var io = require('socket.io-client/socket.io.js');
var Vue = require('vue');
module.exports = function(){
	var socket = io();
	socket.on('books', function(books){
		// books.author
		// books.publisher
		// books.ASIN
		// books.DetailPageURL
		// books.price
		// books.is_kindlized
		// var news = data[data.length-1];
		var vm = new Vue({
			el: '#books_all',
			data: {
				books_all: books
			}
		});
	});	
	socket.on('authors', function(authors){
		console.log(authors);
		var vm2 = new Vue({
			el: '#authors_all',
			data: {
				authors_all: authors
			}
		});
	});
}