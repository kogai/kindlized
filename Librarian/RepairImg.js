"use strict";

var util = require('util');

var Librarian = require('Librarian/Librarian');
var log = require('common/log');

function RepairImg(opts){
	Librarian.call(this, opts);
}

util.inherits(RepairImg, Librarian);

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
