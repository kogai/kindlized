var Q = require('q');
var OperationHelper = require('apac').OperationHelper;

var delay = 1000 * 1 ; // 10seconds
var credential = require('../credential');
var OperatonConfig = {
	endPoint :'ecs.amazonaws.jp', 
	awsId : credential.amazon.AWSAccessKeyId, 
	awsSecret :	credential.amazon.AWSSecretAccessKey,
	assocId : credential.amazon.AWSassociatesId 
};
var authors = [ '岩明均' , '豊田徹也' , '谷口ジロー' , '尾田栄一郎' , '高屋奈月' , '高河ゆん'];

var ancesFn = function( text ){
	console.log('ancesFn is called.');
	callNextFn( parentFn, 5, delay );
};

var parentFn = function(){
	console.log('parentFn is called.');
};

var childFn = function(){
	console.log('childFn is called.');
};

var callNextFn = function ( fn , times , delay ) {
	if ( arguments[3] ){
		var next = arguments[3];
	}
	// 再帰処理定義
	var cb = function( callback ){
		// 遅延処理
		setTimeout( function(){
			callback();
			count++;
			if( count === times ) {
				// 規定回数実行して第四引数で受けた関数を実行
				if( next ){
					setTimeout( next, delay );
				}else{
					return;
				}
			} else {
				// 再帰処理を実行
				cb(fn);
			}
		} , delay );
	};

	// 初回処理
	var count = 1;
	fn();

	// 再帰処理開始
	cb(fn);
};

var callAndSearch = function ( arg ) {
	// 年毎のitemsを検索
	//2014年ページ数を確認
		// ページ毎のitemsを検索
		//2014年の1P目を処理
		//2014年の2P目を処理
		//2014年の3P目を処理

	//2013年ページ数を確認
		// ページ毎のitemsを検索
		//2013年の1P目を処理
		//2013年の2P目を処理
		//2013年の3P目を処理

	//2012年ページ数を確認
		// ページ毎のitemsを検索
		//2012年の1P目を処理
		//2012年の2P目を処理
		//2012年の3P目を処理

	if ( arg === 'year'){
		callNextFn( fn , times , delay , next );
	}else if( arg === 'page' ){
		callNextFn( fn , times , delay , next );
	}
};

var nextFnHandler = function(){
	console.log('nextFnHandler is called.');
	// callNextFn( parentFn, 5, delay, nextFnHandler );
};

module.exports = function(){
	console.log('running...');
	callNextFn( ancesFn, 5, delay );
	// callNextFn( testFn, authors.length, delay, testFnNext );
};

	// var opHelperCountPages = new OperationHelper(OperatonConfig);
	// var ItemSearchObj = new booksSearchObj( Author );

	// opHelperCountPages.execute( 'ItemSearch' , ItemSearchObj , function(error, results){
	// 	if(error){
	// 		console.error(error);
	// 		return;
	// 	}else{
	// 	}
	// }

