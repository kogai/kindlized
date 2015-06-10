"use strict";

var util = require('util');
var Q = require('q');
var moment = require('moment-timezone');

var Librarian = require('Librarian/Librarian');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var log = require('common/log');

/**
@constructor
@classdesc Librarianクラスの継承クラス<br>AuthorityASINの更新を行う
@extends Librarian
**/
function AddASIN(opts){
	Librarian.call(this, opts);
}

util.inherits(AddASIN, Librarian);

/**
	AddASIN.updateのラッパー
	@param { Object } book - 書籍データのオブジェクト
	@return { Object } modifiedBook 書籍データのオブジェクト
**/
AddASIN.prototype._updates = function(book){
	var d = Q.defer();

	var update = {};
	var AuthorityASIN, Items;

	try{
		Items = book.res.ItemLookupResponse.Items;
		Items.map(function(item){
			if(item.Item[0].RelatedItems[0].RelationshipType[0] === 'AuthorityTitle'){
				AuthorityASIN = item.Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
			}
		});
		log.info('AuthorityASIN 更新:' + book.title);
	}catch(e){
		AuthorityASIN = undefined;
		log.info('AuthorityASIN 未更新:' + book.title);
	}
	update.AuthorityASIN = AuthorityASIN;
	update.modifiedLog = {
		AddASINAt: moment()
	};

	this.update(book, update, function(err, modifiedBook){
		if(err){
			return d.reject(err);
		}
		d.resolve(modifiedBook);
	});

	return d.promise;
};

AddASIN.prototype.cron = function(){
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
		$and: [
			{
				$or: [
					{ AuthorityASIN: { $exists: false } },
					{ AuthorityASIN: [''] },
					{ AuthorityASIN: 'UNDEFINED' },
					{ AuthorityASIN: ['UNDEFINED'] }
				]
			},
			{ "modifiedLog.AddASINAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
		]
	};

	_opts.amazonConditions = {
		RelationshipType: 'AuthorityTitle',
		ResponseGroup: 'RelatedItems'
	};

	return new AddASIN(_opts);
};
