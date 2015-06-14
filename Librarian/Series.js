"use strict";

var escape = require('escape-regexp');
var log = require('common/log');

function Series(){
	this.Collections = require('models/Series');
	return this;
}


/**
() （）で囲まれた文字列を削除する
@param { String } title - 書籍のタイトルデータ
@return { String } 括弧で囲まれた文字列を削除した書籍のタイトルデータ
**/
Series.prototype._trimChar = function(title){
	// 括弧で囲まれた文字列の削除
	var trimParentheses = title.replace(/(\(|\（)[\s\S]*?(\)|\）)/g, '');

	// 最後に空白があれば削除
	var trimTailSpace = trimParentheses.replace(/\ +$/, '');
	return trimTailSpace;
};


module.exports = function () {
	return new Series();
};
