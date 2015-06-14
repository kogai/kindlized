"use strict";

var Cronjob = require('cron').CronJob;
var moment = require('moment-timezone');

var Postman = require('Postman/Postman')();

var cronTime = "0 0 21 * * *";

//定期実行
var cronJob = new Cronjob({
  cronTime: cronTime,
  onTick: function() {
    Postman.run();
  },
  start: false
});

cronJob.start();

if(process.env.NODE_ENV === "development"){
  Postman.run();
}
