var books = require('./models/exec.books');
var authors = ["弐瓶勉", "アルコ", "得能正太郎"];
var cronjob = require('cron').CronJob;
var cronTime = "0 0 * * * *";
var num = 0;

job = new cronjob({
	cronTime : cronTime,
	onTick: function () {
		console.log(authors[num]);
		// books(authors[num]);
		num++;
	},
	start: false
});
job.start();