var opHelper 				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( './makeOpConfig' );
var makeSearchExpression	= require( './makeSearchExpression' );
var regInt			   		= require( './regInt' );
var Q 						= require( 'q' );
var constant				= require('./constant');

module.exports = function( authorData ){
	var Author 			= authorData.author;
	var pageCount 		= authorData.pageCount;
	var opConfig 		= new makeOpConfig();
	var opCountPages 	= new opHelper( opConfig );
	var d 				= Q.defer();
	var retryCount 	= 0;
	var retryInterval = 1;

	authorData.bookList = [];

  // ページ数分実行
	var regIntData = {
		times	  		: pageCount,
		interval   	: constant.interval,
		obj			: {},
		d		  		: d,
		authorData 	: authorData,
		callBack   	: function( data ){
			var searchExpression 	= new makeSearchExpression( Author, data.countExec + 1 );

	  		opCountPages.execute( 'ItemSearch', searchExpression,  function( err, res ){
				if( err ) console.log( 'shelf/fetchBookListのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );

				if( res.ItemSearchResponse ){
					// API呼び出しに成功
					retryCount = 0;
					var resBookListPerPage = res.ItemSearchResponse.Items[0].Item;
					data.authorData.bookList = data.authorData.bookList.concat( resBookListPerPage );
					data.countExec++;
				}else{
					// API呼び出しに失敗
					var errorMessage;
					try{
						errorMessage = res.ItemSearchErrorResponse.Error[0].Message[0] + '\n';
					}catch( error ){
						errorMessage = '予想していなかったエラーを検出\n' + error;
					}finally{
						console.log( Author + ' shelf/fetchBookListの' + retryCount + '回目のリクエストエラー => \n', errorMessage );
						retryCount++;
						if( retryCount > 20 ){
							// 20回以上失敗したなら1時間休む
							console.log( Author + ' shelf/fetchBookListは20回失敗したので1時間休む');
							retryInterval = 1000 * 60 * 60;
						}
					}
				}
				setTimeout(function(){
					data.regularInterval( data );
				}, constant.interval * retryCount * retryInterval );
			});
		}
  };
  regInt( regIntData );
  return d.promise;
};
