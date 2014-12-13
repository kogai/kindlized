var CronJob = require('cron').CronJob;
// 3時間に一度DB登録処理を実行
var cronTime = "* * */3 * * *";
// var cronTime = "0 * * * * *";
// var cronTime = "* * * * * *";
var count = 0;
var books = require('./models/exec.books');
var authors = [ '尾田栄一郎' , '豊田徹也' , '谷口ジロー' , '岩明均' , '高屋奈月' , '高河ゆん'];

var job = new CronJob({
	cronTime: cronTime,
	onTick: function(){
		books(authors[count]);
		count++;
		if( count === authors.length ){
			count = 0;
		}
	}
});

job.start();