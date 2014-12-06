var Q = require('q');
var books = require('../models/exec.books-deffered');
// var authorsTest = [ '高山しのぶ' , '高屋奈月' , '高河ゆん'];
var authorsTest = [ '岩明均' , '豊田徹也' , '谷口ジロー' , '高山しのぶ' , '高屋奈月' , '高河ゆん'];
var inc = 0;

function defferd (){
	Q.when(inc)
	.then(step)
	.then(step)
	.then(step)
	.then(step)
	.then(step)
	.then(step)
	.catch(function(err){
		console.log(err);
	})
	.done();
}

function step(inc){
	books(authorsTest[inc]);
	var d = Q.defer();
	inc++;
	d.resolve(inc);
	return d.promise;
}

module.exports = defferd;