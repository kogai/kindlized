"use strict";

var Cronjob = require('cron').CronJob;
var moment = require('moment-timezone');

var Postman = require('Postman/Postman')();

var morning = "0 0 21 * * *";
var night = "0 0 9 * * *";

var registerJob = function(cronTime, onTick){
  var job = new Cronjob({
    cronTime: cronTime,
    onTick: onTick,
    start: false
  });
  job.start();
};

//定期実行
registerJob(morning, Postman.run.bind(Postman));
registerJob(morning, Postman.runSeries.bind(Postman));

if(process.env.NODE_ENV === "development"){
  Postman.run();
  Postman.runSeries();
}
