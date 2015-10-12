require('babel/register');

const Cronjob = require('cron').CronJob;
const Postman = require('Postman/Postman')();
const runPostSeries = require('Postman/PostSeries').runPostSeries;

const morning = '0 0 21 * * *';
const jobPerWeek = '0 0 21 * * 5';

function registerJob(cronTime, onTick) {
  const job = new Cronjob({
    cronTime: cronTime,
    onTick: onTick,
    start: false,
  });
  job.start();
}

// ジョブ登録
registerJob(morning, Postman.run.bind(Postman));
registerJob(jobPerWeek, runPostSeries);
