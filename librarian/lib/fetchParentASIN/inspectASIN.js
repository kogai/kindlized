var opHelper				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../../common/makeOpConfig' );
var makeInspectExpression	= require( './makeInspectExpression' );
var modelBookList 			= require( '../../../shelf/lib/modelBookList' );
var constant				= require('../../../common/constant');

module.exports = function( data ){
	var retryInterval 		= 0;
	var countExec			= data.countExec;
	var bookList 			= data.bookList;
	var book 				= bookList[ countExec ];
	var regularInterval		= data.regularInterval;

	var opConfig 			= new makeOpConfig();
	var opInspectBook 		= new opHelper( opConfig );
	var inspectExpression 	= new makeInspectExpression( book.ASIN[0] );

  opInspectBook.execute( 'ItemLookup', inspectExpression,  function( err, res ){
		if( err ) console.log( 'inspectBookのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );
		try{
      		var AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
			modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, { AuthorityASIN: AuthorityASIN }, function( err, book ){
				countExec++;
			} );
		}catch( error ){
			console.log( 'inspectBookのリクエストエラー', error, res );
			retryInterval = constant.retryInterval;
		}finally{
			setTimeout( function(){
				regularInterval( data );
			}, retryInterval );
		}
	});

};
