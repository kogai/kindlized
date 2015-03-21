var librarian = require('librarian');
var shelf = require('shelf');
var postman = require('postman');
var Q = require('q');
var cronjob = require('cron').CronJob;
var cronTime = "0 0 12 * * *";
var moment = require('moment-timezone');

var libraryHandler = function(currentTime) {
  Q.when()
    .then(shelf)
    .then(function(bookList) {
      var d = Q.defer();
      d.resolve([]);
      return d.promise;
    })
    .then(librarian.inspectBookList)
    .then(librarian.fetchParentASIN)
    .done(function() {
      logTime(currentTime);
    });
};

// タイムゾーンに合わせてログを取る
var logTime = function(currentTime) {
  var current = currentTime.tz('Asia/Tokyo').format('YYYY-MM-DD-hA');
  console.log('all process is complete at', current);
};

//定期実行
job = new cronjob({
  cronTime: cronTime,
  onTick: function() {
    libraryHandler(moment());
    postman();
  },
  start: false
});

job.start();
