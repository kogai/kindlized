"use strict";

var moment = require('moment-timezone');
var escape = require('escape-regexp');

var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var log = require('common/log');

/**
@constructor
**/
function Series(){
	this.Collections = require('models/Series');
	this.BookList = require('models/BookList');
	this.conditions = {
		lastModified: { "$lte": moment().subtract(PERIODICAL_DAY, 'days') }
	};
	// this.items = [];

	return this;
}


Series.prototype.fetch = function(done){
	this.Collections.find(this.conditions, function(err, items){
		if(err){
			return done(err);
		}
		done(null, items);
	});
	return;
};

Series.prototype.crawl = function(){
	return;
};

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


/**
書籍シリーズの保存メソッド
**/
Series.prototype.saveSeries = function(title, done){
	var _self = this;

	this.Collections.find({ seriesKeyword: title }, function(err, series){
		if(err){
			return done(err);
		}
		if(series.length > 0){
			return done('This series is already exists.');
		}

		var query = new RegExp(escape(title));

		_self.BookList.find({ title: query }, function(err, books){
			if(err){
				return done(err);
			}
			var contains = books.map(function(book){
				return {
					_id: book._id,
					title: book.title,
					url: book.url[0]
				};
			});
			var newSeries = new _self.Collections({
				seriesKeyword: title,
				lastModified: moment(),
				recentCount: books.length,
				recentContains: contains,
				currentCount: books.length,
				currentContains: contains,
				hasNewRelease: false
			});

			newSeries.save(function(err){
				if(err){
					return done(err);
				}
				done(null, newSeries);
			});
		});
	});
	return;
};

module.exports = function (opts) {
	var _opts = opts || {};

	return new Series(_opts);
};
