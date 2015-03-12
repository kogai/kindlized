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

	authorData.bookList = [];

  // ページ数分実行
	var regIntData = {
		times	  	: pageCount,
		interval   	: constant.interval,
		obj			: {},
		d		  	: d,
		authorData 	: authorData,
		callBack   	: function( data ){
			var searchExpression 	= new makeSearchExpression( Author, data.countExec + 1 );
				var retryInterval = 0;
		  opCountPages.execute( 'ItemSearch', searchExpression,  function( err, res ){
				if( err ) console.log( 'fetchBookListのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );
				try{
			  var resBookListPerPage = res.ItemSearchResponse.Items[0].Item;
			  data.authorData.bookList = data.authorData.bookList.concat( resBookListPerPage );
			  data.countExec++;
				}catch( error ){
					console.log( 'fetchBookListのリクエストエラー', error, res.ItemSearchErrorResponse.Error );
						retryInterval = constant.retryInterval;
				}
			finally{
				setTimeout(function(){
					data.regularInterval( data );
				}, retryInterval );
			}
			});
		}
  };
  regInt( regIntData );
  return d.promise;
};
