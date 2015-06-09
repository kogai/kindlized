"use strict";

var InspectKindlize = require('Librarian/InspectKindlize')();
var fetchParentASIN = require('Librarian/lib/fetchParentASIN');
var modifyDetailUrl = require('Librarian/lib/modifyDetailUrl');

var Q = require('q');
var Cronjob = require('cron').CronJob;
var moment = require('moment-timezone');

var shelf = require('shelf/');
var postman = require('postman/');
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

    InspectKindlize.run(function(){
      d.resolve();
    });

    return d.promise;
  })
  .then(fetchParentASIN)
  .then(modifyDetailUrl)
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
InspectKindlize.listen();

if(process.env.NODE_ENV === "development"){
  libraryHandler(moment());
}
