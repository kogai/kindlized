var opHelper 						 = require( 'apac' ).OperationHelper;
var makeOpConfig 				 = require( './makeOpConfig' );
var makeSearchExpression = require( './makeSearchExpression' );
var Q 									 = require( 'q' );

module.exports = function( authorData ){
	var Author 						= authorData.author;
	var opConfig 					= new makeOpConfig();
	var opCountPages 			= new opHelper( opConfig );
	var searchExpression 	= new makeSearchExpression( Author );
	var d 								= Q.defer();

	var pageCount = 0;
	var callBack  = function( err, res ){
		if( err ) console.log( 'fetchPageCountsのレスポンスエラー ', err, res );
		try{
			pageCount = res.ItemSearchResponse.Items[0].TotalPages[0];
			authorData.pageCount = Number( pageCount );
		}catch( error ){
			console.log( 'fetchPageCountsのリクエストエラー', error, res.ItemSearchErrorResponse.Error );
			// throw err;
		}finally{
			d.resolve( authorData );
		}
	};
	opCountPages.execute( 'ItemSearch', searchExpression, callBack );
	return d.promise;
};
