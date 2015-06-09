"use strict";

var RepairImg = require('Librarian/RepairImg')();

var log = require('common/log');
var mock = require('test/Librarian/Librarian/mock');

RepairImg._updates(mock).done(function(book){
	log.info(book);
});
