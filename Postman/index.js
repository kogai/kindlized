require('babel/register');

const Cronjob = require('cron').CronJob;
const Postman = require('Postman/Postman')();

const morning = '0 0 21 * * *';
const jobPerWeek = '0 0 9 * * 5';

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
registerJob(jobPerWeek, Postman.runSeries.bind(Postman));

if (process.env.NODE_ENV === 'development') {
  Postman.run();
  Postman.runSeries();
}
