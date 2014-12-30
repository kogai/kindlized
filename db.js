var books = require('./models/exec.books');
var AuthorsModel = require('./models/db.authors');
var Q = require('q');
var cronjob = require('cron').CronJob;
var cronTime = "0 0 * * * *";

var authors = [];
var num = 0;

function getAuthors(){
	// DBから著者リストを非同期に取得する
	var d = Q.defer();
	AuthorsModel.find( {}, function(err, result){
		for (var i = 0; i < result.length; i++) {
			authors.push(result[i].name);
		}
		console.log(authors);
		d.resolve(authors);
	});
	return d.promise;
}

function cronJobExec (){
	job = new cronjob({
		cronTime : cronTime,
		onTick: function () {
			books(authors[num]);
			num++;
			if( authors.length <= num ){
				//初期化処理
				num = 0;
				authors = [];
				job.stop();
				
				//再帰処理
				allProcess();
			}
		},
		start: false
	});
	job.start();
}

function allProcess(){
	console.log('allProcess is start');
	Q.when(authors)
	.then(getAuthors)
	.then(cronJobExec)
	.done();
};

//初回処理
allProcess();