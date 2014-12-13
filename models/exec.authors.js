var Q = require('q');
var books = require('../models/exec.books');
var authors = [ '岩明均' , '豊田徹也' , '谷口ジロー' , '高山しのぶ' , '高屋奈月' , '高河ゆん'];

// var func = function( author ){
// 	var d = Q.defer();
// 		books(author);
// 		d.resolve( author );
// 	return d.promise;
// };

// module.exports = function(){
// 	Q.all( authors.map( func ) )
// 	.then(function(data){
// 		console.log('all promise is resolved.');
// 	});
// }
