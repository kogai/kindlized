"use strict";

var Q = require('q');
var _ = require('underscore');
var moment = require('moment-timezone');

var MailToUser = require('Postman/lib/MailToUser');
var Mailer = require('common/Mailer')();
var Librarian = require('Librarian/Librarian');
var log = require('common/log');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var Utils = require('common/Utils')();

/**
@constructor
**/
function Postman(){
	this.conditions = {
		isVerified: true
	};
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
	var i, seriesItem, newReleasies;
	for (i = 0; i < seriesItems.length; i++) {
		seriesItem = seriesItems[i];
		newReleasies = this._diffItems(seriesItem.recentContains, seriesItem.currentContains);
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


Postman.prototype.runSeries = function(){
	var _self = this;
	var _fetch = this._defer(this.fetch.bind(this));

	Q.when()
	.then(_fetch)
	.then(function(users){
		Utils.map(users, _self.fetchSeries.bind(_self), function(err, series){
			if(err){
				return log.info(err);
			}
			log.info(series);
		});
	});

	/*
	Q.when()
	.then(_fetch)
	.then(function(users){
		Q.all(users.map(function(user){
			_self.fetchSeries(user, function(err, series){

				log.info(series);

				_self.inspectSeries(series, function(err, newSeries){
					if(err){
						return log.info(err);
					}

					log.info(newSeries);

					Mailer.createTemplate("series", newSeries, function(err, mailStrings){
						if(err){
							return log.info(err);
						}
						Mailer.setMail("info@kindlized.it", "kogai0121@gmail.com", "[kindlize.it] 新刊通知", mailStrings);
						Mailer.send(function(err, info){
							if(err){
								return log.info(err);
							}
							log.info(info);
						});
					});
				});
			});
		}));
	});
	*/
};


module.exports = function(){
	return new Postman();
};
