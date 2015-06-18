"use strict";

var moment = require('moment-timezone');
var escape = require('escape-regexp');
var Q = require('q');

var Librarian = require('Librarian/Librarian');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var log = require('common/log');

/**
@constructor
**/
function Series(opts){
	this.Collections = require('models/Series');
	this.BookList = require('models/BookList');
	this.Librarian = new Librarian();
	this._defer = this.Librarian.defer;
	this.conditions = {
		lastModified: { "$lte": moment().subtract(PERIODICAL_DAY, 'days') }
	};
	this.series = [];

	return this;
}


Series.prototype.fetch = function(done){
	var _self = this;
	this.Collections.find(this.conditions, function(err, items){
		if(err){
			return done(err);
		}
		log.info(items.length + "個のシリーズの調査を開始");
		_self.series = items;
		done(null, items);
	});
	return;
};


/**
SeriesコレクションからBookListコレクションを取得する
**/
Series.prototype.join = function(seriesItems, done){
	var conditions = {
		_id: {
			$in: seriesItems.map(function(seriesItem){
				return seriesItem._id;
			})
		}
	};

	this.BookList.find(conditions, function(err, books){
		if(err){
			return done(err);
		}
		done(null, books);
	});
};


/**
seriesItemのアイテムを更新する
seriesKeywordでBookListを検索して、前回とlengthが違えば
新刊があると判定
@param { Object } seriesItem
@param { Function } done
**/
Series.prototype._inspect = function(seriesItem, done){

	var _self = this;
	var query = new RegExp(escape(seriesItem.seriesKeyword));

	this.BookList.find({ title: query }, function(err, books){
		if(err){
			return done(err);
		}

		if(seriesItem.currentCount === books.length){
			log.info('新刊無し ' + books.length + '冊: ' + seriesItem.seriesKeyword);
			return done(null, seriesItem);
		}

		var update = {
			lastModified: moment(),
			recentCount: seriesItem.currentCount,
			recentContains: seriesItem.currentContains,
			currentCount: books.length,
			currentContains: books.map(function(book){
				return {
					_id: book._id,
					title: book.title,
					url: book.url[0]
				};
			}),
			hasNewRelease: true
		};
		var options = { new: true };

		_self.Collections.findOneAndUpdate({ seriesKeyword: seriesItem.seriesKeyword }, update, options, function(err, newSeriesItem){
			if(err){
				return done(err);
			}
			log.info('新刊有り ' + newSeriesItem.currentCount + '冊: ' + newSeriesItem.seriesKeyword);
			done(null, update);
		});
	});
	return;
};


/**
**/
Series.prototype.inspectSeries = function(done){
	var _self = this;
	if(this.series.length === 0){
		done(null, 'inspectSeries required Series.series.');
	}

	Q.all(this.series.map(function(item){
		var d = Q.defer();

		_self._inspect(item, function(err, updatedItem){
			if(err){
				return d.reject(err);
			}
			d.resolve(updatedItem);
		});

		return d.promise;
	}))
	.then(function(series){
		done(null, series);
	})
	.fail(function(err){
		done(err);
	});
};


/**
() （）で囲まれた文字列を削除する
@param { String } title - 書籍のタイトルデータ
@return { String } 括弧で囲まれた文字列を削除した書籍のタイトルデータ
**/
Series.prototype._trimChar = function(title){
	var trimedStr;
	// 括弧で囲まれた文字列の削除
	trimedStr = title.replace(/(\(|\（)[\s\S]*?(\)|\）)/g, '');

	// 最後に空白があれば削除
	trimedStr = trimedStr.replace(/(\s+)$/, '');

	// 末尾に巻数を表す数字があれば削除
	trimedStr = trimedStr.replace(/(\d+)$/, '');

	// 再度末尾の空白を削除(巻数とタイトルの間)
	trimedStr = trimedStr.replace(/(\s+)$/, '');

	// 末尾に!！?？があれば削除
	trimedStr = trimedStr.replace(/([\!！|?？||\:：|;；]+)$/, '');

	return trimedStr;
};


/**
書籍シリーズの保存メソッド
**/
Series.prototype.saveSeries = function(title, done){
	var _self = this;
	title = this._trimChar(title);

	this.Collections.findOne({ seriesKeyword: title }, function(err, series){
		if(err){
			return done(err);
		}
		if(series){
			return done(null, series);
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
};


Series.prototype.run = function(done){
	var _fetch = this._defer(this.fetch.bind(this));
	var _inspectSeries = this._defer(this.inspectSeries.bind(this));

	Q.when()
	.then(_fetch)
	.then(_inspectSeries)
	.then(function(){
		return done();
	})
	.fail(function(err){
		log.info(err);
		return done();
	});
};


Series.prototype.cron = function(){
	return this._defer(this.run.bind(this));
};


module.exports = function (opts) {
	var _opts = opts || {};

	return new Series(_opts);
};
