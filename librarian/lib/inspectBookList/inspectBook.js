var Q						= require('q');
var constant				= require( '../../../common/constant' );
var opHelper 				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../../common/makeOpConfig' );
var makeInspectExpression	= require( './makeInspectExpression' );
var modelBookList 			= require( '../../../shelf/lib/modelBookList' );


module.exports = function( bookList ){
	var d = Q.defer();
	var inspectBookList 	= [];
	var retryCount 		= 0;
	var regularInterval 	= function( data ){

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
				data.d.resolve( inspectBookList );
			}
		}, interval );
	};

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

				if( res.ItemLookupErrorResponse ){
					// リトライ
					retryCount++;
					retryInterval = interval * retryCount;
					console.log( 'librarian/lib/inspectBookList/inspectBook.js', book.title, retryCount, '回目リトライ' );
				}else{
					// 再帰
					countExec++;
					data.countExec 	= countExec;
					retryInterval 	= 0;
					retryCount 			= 0;

					/*
						稀にAuthorityASINを持ちながらRelatedItemsを持たない書籍がある
						恐らく日本未発売の書籍
						See Example -> http://www.amazon.com/dp/0764545507/ref=r_soa_w_d
					*/

					var hasRelatedItems 	= res.ItemLookupResponse.Items[0].Item[0].RelatedItems;
					if( hasRelatedItems ) inspectBookList.push( res );

					try{
						//@todo 別の関数に切り分け
						var relatedItems 		= res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem;

						relatedItems.map( function( item ){
							var relatedBook = item.Item[0].ItemAttributes[0];
							if( relatedBook.ProductGroup[0] === 'eBooks' ){
								modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, { isKindlized: true }, function( err, book ){});
							}
						});
					}catch( error ){}

				}
				setTimeout( function(){
					regularInterval( data );
				}, retryInterval );
			});
		}
	};
	regularInterval( data );
	return d.promise;
};
