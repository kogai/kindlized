"use strict";

var mongoose = require('mongoose');

var mongodb = require('common/makeCredential')('mongodb');
var db = mongoose.createConnection(mongodb);

var MakeModel = require('common/makeModel');

var SeriesSchema = new mongoose.Schema({
	seriesKeyword: {
		type: String,
		index: { uniq: true }
	},
	lastModified: Date,
	recentCount: Number,
	recentContains: Array,
	currentCount: Number,
	currentContains: Array,
	hasNewRelease: Boolean
});

module.exports = db.model("series", SeriesSchema);
