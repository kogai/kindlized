var moment    				= require('moment-timezone');
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
		if( err ) console.log( 'inspectASINのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );
		var modifiedModelBookList 	= {
			lastModified	: moment()
		};
		try{
      		var AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;

			modifiedModelBookList.AuthorityASIN = AuthorityASIN;

			modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, modifiedModelBookList, function( err, book ){
				data.countExec++;
			});
		}catch( error ){
			try{
				console.log( 'inspectASINのリクエストエラー この本はRelatedItemsを持っていない', error );
				modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, modifiedModelBookList, function( err, book ){
					data.countExec++;
				});
			}catch( error ){
				console.log( 'inspectASINのリクエストエラー API呼び出し間隔のエラー処理', error, res.ItemLookupErrorResponse.Error );
			}
			retryInterval = constant.retryInterval;
		}finally{
			setTimeout( function(){
				regularInterval( data );
			}, retryInterval );
		}
	});

};

/*

inspectASINのリクエストエラー [TypeError: Cannot read property 'Items' of undefined] { ItemLookupErrorResponse:
   { '$': { xmlns: 'http://ecs.amazonaws.com/doc/2011-08-01/' },
     Error: [ [Object] ],
     RequestId: [ '6c0b0c4b-95f9-45a7-aa2a-e25f615be716' ] } }

{ '$': { xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01' },
  OperationRequest:
   [ { RequestId: [Object],
       Arguments: [Object],
       RequestProcessingTime: [Object] } ],
  Items: [ { Request: [Object], Item: [Object] } ] }
{ _id: 54fd3040d1ceb21d6b673238,
  images: '[{"ImageSet":[{"$":{"Category":"primary"},"SwatchImage":[{"URL":["http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL30_.jpg"],"Height":[{"_":"30","$":{"Units":"pixels"}}],"Width":[{"_":"20","$":{"Units":"pixels"}}]}],"SmallImage":[{"URL":["http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL75_.jpg"],"Height":[{"_":"75","$":{"Units":"pixels"}}],"Width":[{"_":"50","$":{"Units":"pixels"}}]}],"ThumbnailImage":[{"URL":["http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL75_.jpg"],"Height":[{"_":"75","$":{"Units":"pixels"}}],"Width":[{"_":"50","$":{"Units":"pixels"}}]}],"TinyImage":[{"URL":["http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL110_.jpg"],"Height":[{"_":"110","$":{"Units":"pixels"}}],"Width":[{"_":"73","$":{"Units":"pixels"}}]}],"MediumImage":[{"URL":["http://ecx.images-amazon.com/images/I/5141g9qTBGL._SL160_.jpg"],"Height":[{"_":"160","$":{"Units":"pixels"}}],"Width":[{"_":"106","$":{"Units":"pixels"}}]}],"LargeImage":[{"URL":["http://ecx.images-amazon.com/images/I/5141g9qTBGL.jpg"],"Height":[{"_":"500","$":{"Units":"pixels"}}],"Width":[{"_":"332","$":{"Units":"pixels"}}]}]}]}]',
  is_kindlized: false,
  __v: 0,
  url: [ 'http://www.amazon.co.jp/%E6%96%B0%E8%A3%85%E7%89%88-%E5%AF%84%E7%94%9F%E7%8D%A3-7-KC%E3%83%87%E3%83%A9%E3%83%83%E3%82%AF%E3%82%B9-%E3%82%A2%E3%83%95%E3%82%BF%E3%83%8C%E3%83%BC%E3%83%B3/dp/4063770605%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4063770605' ],
  price:
   [ { Amount: [Object],
       CurrencyCode: [Object],
       FormattedPrice: [Object] } ],
  publicationDate: [ '2014-09-09' ],
  publisher: [ '講談社' ],
  title: [ '新装版 寄生獣(7) (KCデラックス アフタヌーン)' ],
  author: [ '岩明 均' ],
  EAN: [ '9784063770605' ],
  AuthorityASIN: [ 'B000ATE1MO' ],
  ASIN: [ '4063770605' ] }

*/
