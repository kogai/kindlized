var util 						= require( 'util' );
var moment    					= require( 'moment-timezone' );
var opHelper					= require( 'apac' ).OperationHelper;
var makeOpConfig 				= require( 'common/makeOpConfig' );
var constant					= require( 'common/constant' );
var makeInspectExpression	= require( 'librarian/lib/fetchParentASIN/makeInspectExpression' );
var modelBookList 			= require( 'shelf/lib/modelBookList' );

module.exports = function( data ){
	var retryInterval 	= 0;
	var retryCount 		= 0;
	var countExec			= data.countExec;
	var bookList 			= data.bookList;
	var book 				= bookList[ countExec ];
	var regularInterval	= data.regularInterval;

	var opConfig 				= new makeOpConfig();
	var opInspectBook 		= new opHelper( opConfig );
	var inspectExpression 	= new makeInspectExpression( book.ASIN[0] );

  opInspectBook.execute( 'ItemLookup', inspectExpression,  function( err, res ){
		if( err ) console.log( 'inspectASINのレスポンスエラー ', err, res.ItemSearchErrorResponse.Error );
		var modifiedModelBookList 	= {
			lastModified	: moment()
		};

		if( res.ItemLookupResponse ){
			// リクエスト成功の時の処理
			try{
				var AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
				modifiedModelBookList.AuthorityASIN = AuthorityASIN;
				modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, modifiedModelBookList, function( err, book ){
					data.countExec++;
				});
			}catch( error ){
				// AuthorityASINを持っていない書籍の処理
				/*
				var errorLog = '\n\n---------\n';
						errorLog += book.title;
						errorLog += 'はAuthorityASIN/RelatedItemsを持っていない\n';
						errorLog += error;
						errorLog += util.inspect( res.ItemLookupResponse, false, null);
						errorLog += '\n---------\n\n';
				*/
				var errorLog = book.title;
						errorLog += 'はAuthorityASIN/RelatedItemsを持っていない\n';
				console.log( errorLog );

				modelBookList.findOneAndUpdate( { ASIN: book.ASIN }, modifiedModelBookList, function( err, book ){
					data.countExec++;
				});
			}
		}else{
			// リクエスト失敗の時の処理
			console.log( 'inspectASINのリクエストエラー API呼び出し間隔のエラー処理', res.ItemLookupErrorResponse.Error );
			retryCount++;
		}
		setTimeout( function(){
			regularInterval( data );
		}, retryCount *  constant.interval );
	});

};

/*

ヒストリエ 7 (アフタヌーンKC)この本はRelatedItemsを持っていない [TypeError: Cannot read property '0' of undefined]
{ '$': { xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01' },
  OperationRequest:
   [ { RequestId: [ '68175a6c-3263-4765-819d-3a3677462632' ],
       Arguments:
        [ { Argument:
             [ { '$': { Name: 'AWSAccessKeyId', Value: 'AKIAIJIEG4Z42Z22HDYA' } },
               { '$': { Name: 'AssociateTag', Value: 'kogai-22' } },
               { '$': { Name: 'ItemId', Value: '4063583740' } },
               { '$': { Name: 'Operation', Value: 'ItemLookup' } },
               { '$': { Name: 'RelationshipType', Value: 'AuthorityTitle' } },
               { '$': { Name: 'ResponseGroup', Value: 'RelatedItems, Small' } },
               { '$': { Name: 'Service', Value: 'AWSECommerceService' } },
               { '$':
                  { Name: 'Signature',
                    Value: 'ig5J/VOcVwgKeRVsQ2t9CmupV0PeowFiEpe6Eyg1U8E=' } },
               { '$': { Name: 'Timestamp', Value: '2015-03-16T01:52:37Z' } },
               { '$': { Name: 'Version', Value: '2011-08-01' } } ] } ],
       RequestProcessingTime: [ '0.0217840660000000' ] } ],
  Items:
   [ { Request:
        [ { IsValid: [ 'True' ],
            ItemLookupRequest:
             [ { IdType: [ 'ASIN' ],
                 ItemId: [ '4063583740' ],
                 ResponseGroup: [ 'RelatedItems', 'Small' ],
                 VariationPage: [ 'All' ],
                 RelationshipType: [ 'AuthorityTitle' ] } ] } ],
       Item:
        [ { ASIN: [ '4063583740' ],
            DetailPageURL: [ 'http://www.amazon.co.jp/%E3%83%92%E3%82%B9%E3%83%88%E3%83%AA%E3%82%A8-7-%E3%82%A2%E3%83%95%E3%82%BF%E3%83%8C%E3%83%BC%E3%83%B3KC-%E5%B2%A9%E6%98%8E-%E5%9D%87/dp/4063583740%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4063583740' ],
            ItemLinks:
             [ { ItemLink:
                  [ { Description: [ 'Add To Wishlist' ],
                      URL: [ 'http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3D4063583740%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4063583740' ] },
                    { Description: [ 'Tell A Friend' ],
                      URL: [ 'http://www.amazon.co.jp/gp/pdp/taf/4063583740%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4063583740' ] },
                    { Description: [ 'All Customer Reviews' ],
                      URL: [ 'http://www.amazon.co.jp/review/product/4063583740%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4063583740' ] },
                    { Description: [ 'All Offers' ],
                      URL: [ 'http://www.amazon.co.jp/gp/offer-listing/4063583740%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4063583740' ] } ] } ],
            ItemAttributes:
             [ { Author: [ '岩明 均' ],
                 Manufacturer: [ '講談社' ],
                 ProductGroup: [ 'Book' ],
                 Title: [ 'ヒストリエ 7 (アフタヌーンKC)' ] } ] } ] } ] }

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
