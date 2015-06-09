"use strict";

var util = require('util');

var Librarian = require('Librarian/Librarian');
var log = require('common/log');

function RepairImg(opts){
	Librarian.call(this, opts);
}

util.inherits(RepairImg, Librarian);

RepairImg.prototype.read = function(){
	log.info(this.limit);
};

var repair = new RepairImg({
	conditions: {},
	amazonConditions: {}
});

log.info(repair.fetch);
repair.read();

/*
repair.fetch(function(err, books){
	log.info(books);
});
*/
