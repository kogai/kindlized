var log4js = require("log4js");
var log4js_extend = require("log4js-extend");
var moment = require('moment-timezone');

var loggingHandler = function( loggingCategory, isShowConsole ) {
	var fileName = moment().format('YYYYMMDD');
	fileName = loggingCategory + '-' + fileName;
	log4js.configure({
		appenders: [
  		{
  			type: 'file',
  			filename: 'logs/' + fileName + '.log',
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

module.exports = loggingHandler;

/*
var log = loggingHandler('testLog',  true );
log.info('this is test');
*/
