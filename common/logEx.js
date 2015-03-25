var log4js = require("log4js");
var log4js_extend = require("log4js-extend");
var moment = require('moment-timezone');

log4js.configure({
	appenders: [{
		type: 'console'
	}, {
		type: 'file',
		filename: 'logs/postman/' + moment().format('YYYYMMDD') + '.log',
		category: 'postman'
	}]
});

log4js.configure({
	appenders: [{
		type: 'console'
	}, {
		type: 'file',
		filename: 'logs/librarian/' + moment().format('fetchParentASIN-YYYYMMDD') + '.log',
		category: 'fetchParentASIN'
	}]
});

log4js_extend(log4js, {
	path: __dirname,
	format: "at @name (@file:@line:@column)"
});

module.exports = {
	postman: log4js.getLogger("postman"),
	librarian: {
		fetchParentASIN: log4js.getLogger("fetchParentASIN")
	}
};

var loggingHandler = function( loggingCategory, log, isShowConsole ) {
	log4js.configure({
		appenders: [
  		{
  			type: 'file',
  			filename: 'logs/' + moment().format( loggingCategory + '-YYYYMMDD') + '.log',
  			category: loggingCategory
  		}
		]
	});
  if( isShowConsole ){
    log4js.loadAppender('console');
  }

  log4js_extend(log4js, {
  	path: __dirname,
  	format: "at @name (@file:@line:@column)"
  });

	return log4js.getLogger( loggingCategory );
};
