var log4js = require("log4js");
var log4js_extend = require("log4js-extend");
var moment = require('moment-timezone');

var configure = {
	debug: {
		type: 'console',
		category: 'debug'
	},
	warn: {
		type: 'file',
		category: 'warn',
    filename: process.env.NODE_PATH + 'logs/' + moment().format('YYYYMMDD') + '.log'
	}
};

log4js.configure({
	appenders: [
		configure.debug,
		configure.warn
	]
});

log4js_extend(log4js, {
  path: __dirname,
  format: "[@file:@line:@column]"
});

module.exports = log4js.getLogger("debug");
module.exports.warn = log4js.getLogger("warn");
