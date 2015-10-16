import log4js from 'log4js';
import log4js_extend from 'log4js-extend';
import moment from 'moment-timezone';

const configure = {
  debug: {
    type: 'console',
    category: 'debug',
  },
  warn: {
    type: 'file',
    category: 'warn',
    filename: `${process.env.NODE_PATH}logs/${moment().format('YYYYMMDD')}.log`,
  },
};

log4js.configure({
  appenders: [
    configure.debug,
    configure.warn,
  ],
});

log4js_extend(log4js, {
  path: __dirname,
  format: '[@file:@line:@column]',
});

module.exports = log4js.getLogger('debug');
module.exports.warn = log4js.getLogger('warn');
