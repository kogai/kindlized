var opHelper 						 = require( 'apac' ).OperationHelper;
var makeOpConfig 				 = require( './makeOpConfig' );
var makeSearchExpression = require( './makeSearchExpression' );
var Q 									 = require( 'q' );
var constant        		 = require('./constant');

module.exports = function( authorData ){
	var Author 						= authorData.author;
	var opConfig 					= new makeOpConfig();
	var opCountPages 			= new opHelper( opConfig );
	var searchExpression 	= new makeSearchExpression( Author );
	var d 								= Q.defer();

	var pageCount 	= 0;
	var retryCount 	= 0;

	var callBack  = function( err, res ){
		if( err ) console.log( 'fetchPageCountsのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );
		try{
			pageCount = res.ItemSearchResponse.Items[0].TotalPages[0];
			authorData.pageCount = Number( pageCount );
			d.resolve( authorData );
		}catch( error ){
			var retryInterval = constant.retryInterval;
					retryCount++;
			console.log( 'fetchPageCountsの' + retryCount + '回目のリクエストエラー', error, res.ItemSearchErrorResponse.Error );
			setTimeout(function(){
				searchExpression 	= new makeSearchExpression( Author );
				opCountPages.execute( 'ItemSearch', searchExpression, callBack );
			}, retryInterval * retryCount );
		}
	};
	opCountPages.execute( 'ItemSearch', searchExpression, callBack );
	return d.promise;
};
