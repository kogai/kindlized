var log4js = require("log4js");
var log4js_extend = require("log4js-extend");
var moment = require('moment-timezone');

log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: 'logs/' + moment().format('YYYYMMDD') + '.log',
    category: 'dev'
  }]
});

log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});

module.exports = log4js.getLogger("dev");
