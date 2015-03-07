var opHelper 						 = require( 'apac' ).OperationHelper;
var makeOpConfig 				 = require( './makeOpConfig' );
var makeSearchExpression = require( './makeSearchExpression' );
var Q 									 = require( 'q' );

module.exports = function( Author ){
	var opConfig 					= new makeOpConfig();
	var opCountPages 			= new opHelper( opConfig );
	var searchExpression 	= new makeSearchExpression( Author );
	var d 								= Q.defer();

	var pageCount = 0;
	var callBack  = function( err, res ){
		if( err ) throw err;
		try{
			pageCount = res.ItemSearchResponse.Items[0].TotalPages[0];
			pageCount = Number( pageCount );
			d.resolve( pageCount );
		}catch( err ){
			console.log( 'fetchPageCountsのエラー', err );
			throw err;
		}
	};
	opCountPages.execute( 'ItemSearch', searchExpression, callBack );
	return d.promise;
}
