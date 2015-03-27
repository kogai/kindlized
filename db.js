var librarian = require('librarian');
var shelf = require('shelf');
var postman = require('postman');
var Q = require('q');
var cronjob = require('cron').CronJob;
var cronLibrarian = "0 0 * * * *";
var cronPostman = "0 0 21 * * *";
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
    .then(librarian.modifyDetailUrl)
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
jobLibrarian = new cronjob({
  cronTime: cronLibrarian,
  onTick: function() {
    libraryHandler(moment());
  },
  start: false
});
jobLibrarian.start();

jobPostman = new cronjob({
  cronTime: cronPostman,
  onTick: function() {
    postman();
    logTime(moment());
  },
  start: false
});
jobPostman.start();
