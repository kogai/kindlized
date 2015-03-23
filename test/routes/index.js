var post = require('test/routes/post');
var saveBook = require('test/routes/saveBook');
var search = require('test/routes/search');

module.exports = function(){
	post();
  saveBook();
	search();
};
