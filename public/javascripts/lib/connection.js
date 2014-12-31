var io = require('socket.io-client/socket.io.js');
var Vue = require('vue');
module.exports = function(){
	var socket = io();
	socket.on('books', function(books){
		var vm = new Vue({
			el: '#books_all',
			data: {
				books_all: books
			}
		});
	});
};