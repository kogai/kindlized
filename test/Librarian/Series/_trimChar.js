"use strict";

var log = require('common/log');
var Series = require('Librarian/Series')();
var mock = '新装版 寄生獣(2) (KCデラックス アフタヌーン)（テス ト）';

var _mock = Series._trimChar(mock);

log.info(_mock);
log.info(_mock.length);
