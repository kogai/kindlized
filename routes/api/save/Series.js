"use strict";

var moment = require('moment-timezone');

var User = require('models/User');
var Series = require('Librarian/Series')();
var log = require('common/log');

module.exports = function(req, res){
	var query = req.body.query;

	Series.saveSeries(query, function(err, newSeries){
		if(err){
			log.info(err);
			return res.send("Error.");
		}
		var resMessage = "『" + newSeries.seriesKeyword + '』を登録しました。';
		var existMessage = "『" + newSeries.seriesKeyword + '』は登録済みです。';

		if(process.env.NODE_ENV === 'development'){
			req.session.passport = {
				user: "55098ed6c0fa27f716c0717e"
			};
		}

		var conditions = {
			_id: req.session.passport.user,
			"seriesList.seriesKeyword": {
				$nin: [ newSeries.seriesKeyword ]
			}
		};

		var update = {
			"modifiedLog.seriesListAt": moment(),
			$push: {
				seriesList: {
					_id: newSeries._id,
					seriesKeyword: newSeries.seriesKeyword
				}
			}
		};

		var option = { new: true };

		User.findOneAndUpdate(conditions, update, option, function(err, user){
			if(err){
				return log.info(err);
			}
			if(user){
				res.send({
					message: resMessage
				});
			}else{
				res.send({
					message: existMessage
				});
			}
		});
	});
};
