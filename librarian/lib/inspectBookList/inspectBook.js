var Q						= require('q');
var constant				= require( '../../../common/constant' );
var opHelper 				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../../common/makeOpConfig' );
var makeInspectExpression	= require( './makeInspectExpression' );
var modelBookList 			= require( '../../../shelf/lib/modelBookList' );

var regularInterval = function( data ){

	// 実行回数を初期化
	if( !data.countExec ) data.countExec = 0;

	// dataオブジェクトから変数を取り出し
	var times		= data.times;
	var interval	= data.interval;
	var callBack	= data.callBack;
	var countExec 	= data.countExec;

	setTimeout( function(){
		if( countExec <	times ){
			// 実行の実体
			callBack( data );
		}else{
			// times回実行されたら終了
			console.log( 'inspectBook-regularInterval is complete.');
			data.d.resolve( data.bookList );
		}
	}, interval );
};

module.exports = function( bookList ){
	var d = Q.defer();

	var data = {
		times		: bookList.length,
		interval	: constant.interval,
		bookList	: bookList,
		d			: d,
		regularInterval : regularInterval,
		callBack : function( data ){

			var times			= data.times;
			var interval		= data.interval;
			var callBack		= data.callBack;
			var countExec 		= data.countExec;
			var regularInterval	= data.regularInterval;
			var bookList 		= data.bookList;
			var book 			= bookList[ countExec ];

			var opConfig 			= new makeOpConfig();
			var opInspectBook 		= new opHelper( opConfig );
			var inspectExpression 	= new makeInspectExpression( book.AuthorityASIN[0] );
			var retryInterval 		= 0;

			opInspectBook.execute( 'ItemLookup', inspectExpression,	function( err, res ){
				if( err ) console.log( 'inspectBookのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );
				try{
					// var relatedItems = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0];
					// var relatedItems = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0];
					var relatedItems = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem;

					for (var i = 0; i < relatedItems.length; i++) {
						var relatedBook = relatedItems[i].Item[0].ItemAttributes[0];
						if( relatedBook.ProductGroup[0] === 'eBooks' ){
							modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, { isKindlized: true }, function( err, book ){});
						}
					}
					countExec++;
					data.countExec = countExec;
				}catch( error ){
					console.log( 'inspectBookのリクエストエラー', error, res.ItemLookupResponse );
					// console.log( 'inspectBookのリクエストエラー', error, res );
					retryInterval = 1000;
					// retryInterval = constant.retryInterval;
				}finally{
					setTimeout( function(){
						regularInterval( data );
					}, retryInterval );
				}
			});
		}
	};
	regularInterval( data );
	return d.promise;
};
