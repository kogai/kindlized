var librarian = require('librarian');
var shelf = require('shelf');
var postman = require('postman');
var Q = require('q');
var Cronjob = require('cron').CronJob;
var cronLibrarian = "0 0 * * * *";
var cronPostman = "0 0 21 * * *";
var moment = require('moment-timezone');

// タイムゾーンに合わせてログを取る
var logTime = function(currentTime) {
  "use strict";
  var current = currentTime.tz('Asia/Tokyo').format('YYYY-MM-DD-hA');
  console.log('all process is complete at', current);
};

var libraryHandler = function(currentTime) {
  "use strict";
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
    "use strict";
    libraryHandler(moment());
  },
  start: false
});
jobLibrarian.start();

var jobPostman = new Cronjob({
  cronTime: cronPostman,
  onTick: function() {
    "use strict";
    postman();
    logTime(moment());
  },
  start: false
});
jobPostman.start();
