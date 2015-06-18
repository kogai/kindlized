"use strict";

var mongoose = require('mongoose');
var mongodb = require('common/makeCredential')('mongodb');
var db = mongoose.createConnection(mongodb);

/**
@example
{
	seriesKeyword: '新装版 寄生獣',
	lastModified: { "$date": "2015-06-01T04:00:00.000Z" },
	recentCount: 10,
	recentContains: [{
		_id: "54fd3040d1ceb21d6b673237",
		title: "新装版 寄生獣(2) (KCデラックス アフタヌーン)",
		url: "http://www.amazon.co.jp/%E5%AF%84%E7%94%9F%E7%8D%A3%EF%BC%88%EF%BC%92%EF%BC%89-%E5%B2%A9%E6%98%8E%E5%9D%87-ebook/dp/B009KWUIJ2%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB009KWUIJ2"
	}],
	currentCount: 12,
	currentContains: [{
		_id: "54fd3040d1ceb21d6b673237",
		title: "新装版 寄生獣(2) (KCデラックス アフタヌーン)",
		url: "http://www.amazon.co.jp/%E5%AF%84%E7%94%9F%E7%8D%A3%EF%BC%88%EF%BC%92%EF%BC%89-%E5%B2%A9%E6%98%8E%E5%9D%87-ebook/dp/B009KWUIJ2%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB009KWUIJ2"
	}],
	hasNewRelease: true
}
**/
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
