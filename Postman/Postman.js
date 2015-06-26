"use strict";

var Q = require('q');
var _ = require('underscore');
var moment = require('moment-timezone');

var MailToUser = require('Postman/lib/MailToUser');
var Librarian = require('Librarian/Librarian');
var Series = require('Librarian/Series')();

var log = require('common/log');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

/**
@constructor
**/
function Postman(){
	this.conditions = {
		isVerified: true
	};
	this.Mailer = require('common/Mailer')();
	this.Utils = require('common/Utils')();
	this.User = require('models/User');
	this.Series = require('models/Series');
	this.users = [];
	this.Librarian = new Librarian();
	this._defer = this.Librarian.defer;

	return this;
}


Postman.prototype.fetch = function(done){
	var _self = this;
	this.User.find(this.conditions, function(err, users){
		if(err){
			return done(err);
		}
		_self.users = users;
		done(null, users);
	});
};


Postman.prototype.sent = function(done){
	Q.all(this.users.map(MailToUser.send))
	.then(function(){
		done();
	})
	.fail(function(err){
		done(null, err);
	});
};


/**
ユーザーの登録しているSeries配列の新刊を持っているSeriesコレクションを取得する
@param { Object } user - Userドキュメント
@param { FUnction } done
@return { Error | Array }
**/
Postman.prototype.fetchSeries = function(user, done){
	var _self = this;
	var conditions = {
		$and: [
			{
				_id: {
					$in: user.seriesList.map(function(userSeriesItem){
						return userSeriesItem._id;
					})
				}
			},
			{ hasNewRelease: true }
		]
	};

	this.Series.find(conditions, function(err, seriesItems){
		if(err){
			return done(err);
		}
		done(null, _self._filterSeries(user, seriesItems));
	});
};


/**
ユーザーが新刊を調べた日:2015-06-01 < 新刊が確認された日:2015-06-10
UserDocument.seriesList[*].lastModified < SeriesDocument.lastModified
@param { Object } user - Userドキュメント
@param { Array } seriesItems- Seriesコレクション
@return { Array }
**/
Postman.prototype._filterSeries = function(user, seriesItems){

	var filteredSeriesItems = seriesItems.map(function(seriesItem){
		var isBeforeNewRelease = moment(seriesItem.lastModified).isBefore(user.modifiedLog.seriesListAt);
		if(isBeforeNewRelease){
			return seriesItem;
		}
	});
	return _.compact(filteredSeriesItems);
};


/**
Seriesコレクションから新刊のBookListドキュメントを抽出する
@param { Array } seriesItems - Seriesコレクション
@param { FUnction } done
@return { Error | Array } 新刊のBookListコレクション
**/
Postman.prototype.inspectSeries = function(seriesItems, done){
	var i, seriesItem, newReleasies = [];
	for (i = 0; i < seriesItems.length; i++) {
		seriesItem = seriesItems[i];
		newReleasies = this._diffItems(seriesItem.recentContains, seriesItem.currentContains);
	}
	if(newReleasies.length === 0){
		return done({
			"status": 'not-sent',
			"message": "通知するシリーズ書籍がありません"
		});
	}
	done(null, newReleasies);
};


/**
**/
Postman.prototype._diffItems = function(srcArray, criteriaArray){
	var diffArray = _.filter(srcArray, function(obj){
		return !_.findWhere(criteriaArray, obj);
	});
	return diffArray;
};


Postman.prototype.run = function(){
	var _fetch = this._defer(this.fetch.bind(this));
	var _sent = this._defer(this.sent.bind(this));

	Q.when()
	.then(_fetch)
	.then(_sent)
	.then(function(){
		log.info('全メールの配信が完了');
	})
	.fail(function(err){
		log.info(err);
	});
};



Postman.prototype.sentSeries = function(user){
	var args = Array.prototype.slice.call(arguments);
			args = _.compact(args);
	var done = args[args.length - 1];

	var _Mailer = this.Mailer;

	var _fetchSeries = this.Utils.defer(this.fetchSeries.bind(this));
	var _inspectSeries = this.Utils.defer(this.inspectSeries.bind(this));

	var _createTemplate = this.Utils.defer(function(series, done){
		_Mailer.createTemplate('series', series, function(err, mailStrings){
			if(err){
				return done(err);
			}
			_Mailer.setMail("info@kindlized.it", user.mail, "[kindlize.it] 新刊通知", mailStrings);
			done();
		});
	});

	var _sendMail = this.Utils.defer(_Mailer.send.bind(_Mailer));

	Q.when(user)
	.then(_fetchSeries)
	.then(_inspectSeries)
	.then(_createTemplate)
	.then(_sendMail)
	.then(function(series){
		done(null, series);
	})
	.fail(function(err){
		done(null, err);
	});
};


Postman.prototype.runSeries = function(){
	var _series = Series.cron.bind(Series)();
	var _fetch = this._defer(this.fetch.bind(this));
	var _sentSeries = this.Utils.defer(this.sentSeries.bind(this));

	var _sentAllUsers = this.Utils.defer(function(users, done){
		Q.all(users.map(_sentSeries))
		.then(function(sendStatus){
			done(null, sendStatus);
		})
		.fail(function(err){
			done(err);
		});
	});

	Q.when()
	.then(_series)
	.then(_fetch)
	.then(_sentAllUsers)
	.then(function(sendStatus){
		return log.info(sendStatus);
	})
	.fail(function(err){
		return log.info(err);
	});
};


module.exports = function(){
	return new Postman();
};
