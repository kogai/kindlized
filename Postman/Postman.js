"use strict";

var Q = require('q');
var _ = require('underscore');
var moment = require('moment-timezone');

var MailToUser = require('Postman/lib/MailToUser');
var Librarian = require('Librarian/Librarian');
var log = require('common/log');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;


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
2015-06-01 < 2015-06-10
UserDocument.seriesList[*].lastModified < SeriesDocument.lastModified
@param { Array } seriesItems
@return { Array }
**/
Postman.prototype._filterSeries = function(user, seriesItems){
	var filteredSeriesItems = seriesItems.map(function(seriesItem){
		user.seriesList.map(function(userSeries){
			if(userSeries.seriesKeyword === seriesItem.seriesKeyword){
				var isBeforeNewRelease = moment(seriesItem.lastModified).isBefore(userSeries.lastModified);
				if(isBeforeNewRelease){
					return seriesItem;
				}
			}
		});
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
	i = null;
	seriesItem = null;

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

module.exports = function(){
	return new Postman();
};
