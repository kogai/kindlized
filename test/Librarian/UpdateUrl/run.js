"use strict";

var UpdateUrl = require('Librarian/UpdateUrl')({ limit: 5 });

var log = require('common/log');
var util = require('util');

UpdateUrl.run(function(books){
	// log.info(util.inspect(books, null, null));
	log.info('end.');
});
