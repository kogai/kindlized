var $ = require('jquery');
var validate = require('./validate');
var connection = require('./connection');

$(window).on( 'load' , function(){
	console.log('loaded');
	validate.regist;
	connection();
});