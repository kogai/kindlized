var opHelper 						   = require( 'apac' ).OperationHelper;
var makeOpConfig 				   = require( '../../common/makeOpConfig' );
var makeInspectExpression  = require( './makeInspectExpression' );
var modelBookList 				 = require( '../../shelf/lib/modelBookList' );
var constant							 = require('../../common/constant');

module.exports = function( data ){
	var retryInterval 		= 0;
	var countExec					= data.countExec;
	var bookList 					= data.bookList;
	var book 							= bookList[ countExec ];
	var regularInterval		= data.regularInterval;

	var opConfig 					= new makeOpConfig();
	var opInspectBook 		= new opHelper( opConfig );
	var inspectExpression = new makeInspectExpression( book.ASIN[0] );

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
			console.log( 'finally callback is excution.' );
			setTimeout( function(){
				regularInterval( data );
			}, retryInterval );
		}
	});

};

/*

{ '$': { xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01' },
  OperationRequest:
   [ { RequestId: [Object],
       Arguments: [Object],
       RequestProcessingTime: [Object] } ],
  Items: [ { Request: [Object] } ] }

{ _id: 54fd30a45fd4c0f26ba4a008,
  images: '[{"ImageSet":[{"$":{"Category":"primary"},"SwatchImage":[{"URL":["http://ecx.images-amazon.com/images/I/51A5W%2BtBtML._SL30_.jpg"],"Height":[{"_":"30","$":{"Units":"pixels"}}],"Width":[{"_":"30","$":{"Units":"pixels"}}]}],"SmallImage":[{"URL":["http://ecx.images-amazon.com/images/I/51A5W%2BtBtML._SL75_.jpg"],"Height":[{"_":"75","$":{"Units":"pixels"}}],"Width":[{"_":"75","$":{"Units":"pixels"}}]}],"ThumbnailImage":[{"URL":["http://ecx.images-amazon.com/images/I/51A5W%2BtBtML._SL75_.jpg"],"Height":[{"_":"75","$":{"Units":"pixels"}}],"Width":[{"_":"75","$":{"Units":"pixels"}}]}],"TinyImage":[{"URL":["http://ecx.images-amazon.com/images/I/51A5W%2BtBtML._SL110_.jpg"],"Height":[{"_":"110","$":{"Units":"pixels"}}],"Width":[{"_":"110","$":{"Units":"pixels"}}]}],"MediumImage":[{"URL":["http://ecx.images-amazon.com/images/I/51A5W%2BtBtML._SL160_.jpg"],"Height":[{"_":"160","$":{"Units":"pixels"}}],"Width":[{"_":"160","$":{"Units":"pixels"}}]}],"LargeImage":[{"URL":["http://ecx.images-amazon.com/images/I/51A5W%2BtBtML.jpg"],"Height":[{"_":"500","$":{"Units":"pixels"}}],"Width":[{"_":"500","$":{"Units":"pixels"}}]}]}]}]',
  is_kindlized: false,
  __v: 0,
  url: [ 'http://www.amazon.co.jp/%E3%83%A4%E3%82%B9%E3%82%B3%E3%81%A8%E3%82%B1%E3%83%B3%E3%82%B8TV%E3%83%89%E3%83%A9%E3%83%9E%E5%8C%96%E3%82%B9%E3%83%9A%E3%82%B7%E3%83%A3%E3%83%AB%E7%89%88-SHUEISHA-Girls-Remix-%E3%82%A2%E3%83%AB%E3%82%B3/dp/4081096295%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4081096295' ],
  price:
   [ { Amount: [Object],
       CurrencyCode: [Object],
       FormattedPrice: [Object] } ],
  publicationDate: [ '2008-07' ],
  publisher: [ '集英社' ],
  title: [ 'ヤスコとケンジTVドラマ化スペシャル版! (SHUEISHA Girls Remix)' ],
  author: [ 'アルコ' ],
  EAN: [ '9784081096299' ],
  ASIN: [ '4081096295' ] }

*/
