require('babel/register');

const Series = require('Librarian/Series')();
const AddBook = require('Librarian/AddBook')();
const InspectKindlize = require('Librarian/InspectKindlize')();
const RepairImg = require('Librarian/RepairImg')();
const AddASIN = require('Librarian/AddASIN')();
const UpdateUrl = require('Librarian/UpdateUrl')();
const SendStatus = require('Librarian/SendStatus')();

const Q = require('q');
const CronJob = require('cron').CronJob;
const moment = require('moment-timezone');

const log = require('common/log');

const cronTime = '0 */20 * * * *';
const cronTimePerDay = '0 0 9 * * *';
const cronTimePerWeek = '0 0 9 * * 5';

function libraryHandler() {
  const _addBook = AddBook.cron.bind(AddBook)();
  const _repairImg = RepairImg.cron.bind(RepairImg);
  const _inspectKindlize = InspectKindlize.cron.bind(InspectKindlize);
  const _addAsin = AddASIN.cron.bind(AddASIN);
  const _updateUrl = UpdateUrl.cron.bind(UpdateUrl);

  Q.when()
  .then(_addBook)
  .then(_repairImg)
  .then(_addAsin)
  .then(_updateUrl)
  .then(_inspectKindlize)
  .then(()=> {
    return log.info(moment().format('YYYY-MM-DD hh:mm') + ': Librarian process is End.');
  })
  .fail((err)=> {
    return log.info(err);
  });
}

function seriesHandler() {
  Series.run((err)=> {
    if (err) {
      return log.info(err);
    }
    log.info(`新刊調査ジョブが完了 ${moment().format('YYYY-MM-DD hh:mm')}`);
  });
}

// 定期実行
const cronJob = new CronJob({
  cronTime: cronTime,
  onTick: libraryHandler,
  start: false,
});

const cronJobPerDay = new CronJob({
  cronTime: cronTimePerDay,
  onTick: SendStatus.sentAllStatus,
  start: false,
});

const cronJobPerWeek = new CronJob({
  cronTime: cronTimePerWeek,
  onTick: seriesHandler,
  start: false,
});

cronJob.start();
cronJobPerDay.start();
cronJobPerWeek.start();

InspectKindlize.listen();

if (process.env.NODE_ENV === 'development') {
  libraryHandler();
  seriesHandler();
}
