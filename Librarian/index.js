"use strict";

var Shelf = require('Librarian/Shelf/')();
var InspectKindlize = require('Librarian/InspectKindlize')();
var fetchParentASIN = require('Librarian/lib/fetchParentASIN');
var modifyDetailUrl = require('Librarian/lib/modifyDetailUrl');

var Q = require('q');
var Cronjob = require('cron').CronJob;
var moment = require('moment-timezone');

var log = require('common/log');

var cronTime = "0 0 * * * *";

// タイムゾーンに合わせてログを取る
var logTime = function(currentTime) {
  var current = currentTime.tz('Asia/Tokyo').format('YYYY-MM-DD-hA');
  log.info('all process is complete at' + current);
};

var libraryHandler = function(currentTime) {
  Q.when()
  .then(Shelf.cron.bind(Shelf))
  .then(InspectKindlize.cron.bind(InspectKindlize))
  .then(fetchParentASIN)
  .then(modifyDetailUrl)
  .done(function() {
    logTime(currentTime);
  });
};

//定期実行
var cronJob = new Cronjob({
  cronTime: cronTime,
  onTick: function() {
    libraryHandler(moment());
  },
  start: false
});
cronJob.start();

InspectKindlize.listen();

if(process.env.NODE_ENV === "development"){
  libraryHandler(moment());
}
