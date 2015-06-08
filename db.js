"use strict";
require('newrelic');

var Q = require('q');
var Cronjob = require('cron').CronJob;
var moment = require('moment-timezone');

var librarian = require('librarian');
var shelf = require('shelf');
var postman = require('postman');
var log = require('common/log');

var cronLibrarian = "0 0 * * * *";
var cronPostman = "0 0 21 * * *";

// タイムゾーンに合わせてログを取る
var logTime = function(currentTime) {
  var current = currentTime.tz('Asia/Tokyo').format('YYYY-MM-DD-hA');
  log.info('all process is complete at' + current);
};

var libraryHandler = function(currentTime) {
  Q.when()
  .then(shelf)
  .then(function() {
    var d = Q.defer();
    d.resolve([]);
    return d.promise;
  })
  .then(librarian.inspectBookList)
  .then(librarian.fetchParentASIN)
  .then(librarian.modifyDetailUrl)
  .done(function() {
    logTime(currentTime);
  });
};

//定期実行
var jobLibrarian = new Cronjob({
  cronTime: cronLibrarian,
  onTick: function() {
    libraryHandler(moment());
  },
  start: false
});
jobLibrarian.start();

var jobPostman = new Cronjob({
  cronTime: cronPostman,
  onTick: function() {
    postman();
    logTime(moment());
  },
  start: false
});
jobPostman.start();

if(process.env.NODE_ENV === "development"){
  libraryHandler(moment());
}
