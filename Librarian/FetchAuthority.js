"use strict";

var util = require('util');
var Q = require('q');

var Librarian = require('Librarian/Librarian');
var log = require('common/log');

/**
@constructor
@classdesc Librarianクラスの継承クラス<br>Imageの更新を行う
**/
function FetchAuthority(opts){
	Librarian.call(this, opts);
}

util.inherits(FetchAuthority, Librarian);

/**
	FetchAuthority.updateのラッパー
	@param { Object } book - 書籍データのオブジェクト
	@return { Object } modifiedBook 書籍データのオブジェクト
**/
FetchAuthority.prototype._updates = function(book){
	var d = Q.defer();

	var update = {};
	var images;
	try{
		images = book.res.ItemLookupResponse.Items[0].Item[0].ImageSets;
		images = JSON.stringify(images);
		log.info('画像更新:' + book.title);
	}catch(e){
		images = "";
		log.info('画像未更新:' + book.title);
		log.info(util.inspect(book.res.ItemLookupResponse, null, null));
	}
	update.images = images;

	this.update(book, update, function(err, modifiedBook){
		if(err){
			return d.reject(err);
		}
		d.resolve(modifiedBook);
	});

	return d.promise;
};

FetchAuthority.prototype.cron = function(){
	var d = Q.defer();
	var _updates = this._updates.bind(this);

	this.run(function(books){
		Q.all(books.map(_updates))
		.done(function(modifiedBooks){
			d.resolve(modifiedBooks);
		});
	});

	return d.promise;
};

module.exports = function(opts){
	var _opts = opts || {};

	_opts.conditions = {
		$or: [
			{
				images: {
					$exists: false
				}
			},
			{
				$where: "this.images == 0"
			}
		]
	};
	return new FetchAuthority(opts);
};
