"use strict";

var Series = require('Librarian/Series')();
var AddBook = require('Librarian/AddBook')();
var InspectKindlize = require('Librarian/InspectKindlize')();
var RepairImg = require('Librarian/RepairImg')();
var AddASIN = require('Librarian/AddASIN')();
var UpdateUrl = require('Librarian/UpdateUrl')();

var Q = require('q');
var Cronjob = require('cron').CronJob;
var moment = require('moment-timezone');

var log = require('common/log');

var cronTime = "0 0 * * * *";

var libraryHandler = function(currentTime) {
  var _series = Series.cron.bind(Series)();
  var _addBook = AddBook.cron.bind(AddBook)();
  var _repairImg = RepairImg.cron.bind(RepairImg);
  var _inspectKindlize = InspectKindlize.cron.bind(InspectKindlize);
  var _addAsin = AddASIN.cron.bind(AddASIN);
  var _updateUrl = UpdateUrl.cron.bind(UpdateUrl);

  Q.when()
  .then(_series)
  .then(_addBook)
  .then(_repairImg)
  .then(_inspectKindlize)
  .then(_addAsin)
  .then(_updateUrl)
  .then(function(){
    return log.info(moment().format('YYYY-MM-DD hh:mm') + ': Librarian process is End.');
  })
  .fail(function(err){
    return log.info(err);
  });
};

//定期実行
var cronJob = new Cronjob({
  cronTime: cronTime,
  onTick: function() {
    libraryHandler();
  },
  start: false
});
cronJob.start();

InspectKindlize.listen();

if(process.env.NODE_ENV === "development"){
  libraryHandler();
}
