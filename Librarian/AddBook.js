"use strict";

var util = require('util');
var moment = require('moment-timezone');

var Author = require('models/Author');
var Librarian = require('Librarian/Librarian');
var log = require('common/log');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var LIMIT = require('common/constant').LIMIT.AUTHOR;

/**
@constructor
@classdesc Librarianクラスの継承クラス
@extends Librarian
**/
function AddBook(opts){
	Librarian.call(this, opts);
	return this;
}

util.inherits(AddBook, Librarian);

/**
AddBook.prototype.run = function(){

};
**/

module.exports = function(opts){
	var _opts = opts || {};
	_opts.Model = Author;
	_opts.conditions = {
		$or: [
      { lastModified: { $lte: moment().subtract( PERIODICAL_DAY, 'days' ) } },
			{ lastModified: { $exists: false } }
    ]
	};

	return new AddBook(_opts);
};
