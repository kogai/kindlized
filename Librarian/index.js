"use strict";

var Shelf = require('Librarian/Shelf/')();
var InspectKindlize = require('Librarian/InspectKindlize')();
var RepairImg = require('Librarian/RepairImg')();
var AddASIN = require('Librarian/AddASIN')();

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

  var shelf = Shelf.cron.bind(Shelf);
  var repairImg = RepairImg.cron.bind(RepairImg);
  var inspectKindlize = InspectKindlize.cron.bind(InspectKindlize);
  var addAsin = AddASIN.cron.bind(AddASIN);

  Q.when()
  .then(shelf)
  .then(repairImg)
  .then(inspectKindlize)
  .then(addAsin)
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
