"use strict";

var util = require('util');
var Q = require('q');

var Librarian = require('Librarian/Librarian');
var log = require('common/log');

function RepairImg(opts){
	Librarian.call(this, opts);
}

util.inherits(RepairImg, Librarian);

RepairImg.prototype._updates = function(books, callback){
	var _self = this;

	Q.all(books.map(function(book){
		var d = Q.defer();

		_self.Model.findOneAndUpdate({}, {}, function(err){
			if(err){
				return d.reject(err);
			}
			d.resolve();
		});

		return d.promise;
	}))
	.fail(function(err){
		callback(err);
	});
	.done(function(){
		callback(null);
	});
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
