"use strict";

var util = require('util');
var Q = require('q');

var Librarian = require('Librarian/Librarian');
var log = require('common/log');

function RepairImg(opts){
	Librarian.call(this, opts);
}

util.inherits(RepairImg, Librarian);

/*
	RepairImg.updateのラッパー
	@param book 書籍データのオブジェクト
*/
RepairImg.prototype._updates = function(book){
	var d = Q.defer();

	var update = {};
	var images;
	try{
		images = book.res.ItemLookupResponse.Items[0].Item[0].ImageSets;
	}catch(e){
		images = "";
	}
	update.images = images;

	this.update(book, update, function(err){
		if(err){
			return d.reject(err);
		}
		d.resolve();
	});

	return d.promise;
};

RepairImg.prototype.cron = function(){
	var d = Q.defer();
	var _updates = this._updates.bind(this);

	this.run(function(books){
		Q.all(books.map(_updates))
		.done(function(){
			d.resolve();
		});
	});

	return d.promise;
};

module.exports = function(opts){
	opts.conditions = {
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
	return new RepairImg(opts);
};
