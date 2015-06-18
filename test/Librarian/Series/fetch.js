"use strict";

var log = require('common/log');
var Series = require('Librarian/Series')();
var mock = '新装版 寄生獣(2) (KCデラックス アフタヌーン)（テス ト）';

Series.fetch(function(err, items){
	if(err){
		return log.info(err);
	}
	log.info(items);
});
