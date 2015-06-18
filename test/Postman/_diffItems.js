"use strict";

var Postman = require('Postman/Postman')();
var log = require('common/log');

var srcArray = [
	{'id':1, 'value':10}, {'id':2, 'value':20 }, {'id':3, 'value':30 }, {'id':4, 'value':40 }
];

var criteriaArray = [
	{'id':1, 'value':10}, {'id':4, 'value':40 }
];

var diffArray = Postman._diffItems(srcArray, criteriaArray);

log.info(diffArray);
