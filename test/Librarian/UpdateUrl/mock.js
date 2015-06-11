module.exports = {
	ASIN: ['4091870848'],
	err: null,
	res: {
		ItemLookupResponse: {
			'$': {
				xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01'
			},
			OperationRequest: [{
				RequestId: ['4967d35c-9522-480e-ac50-f40873ed24ca'],
				Arguments: [{
					Argument: [{
						'$': {
							Name: 'AWSAccessKeyId',
							Value: 'AKIAIJIEG4Z42Z22HDYA'
						}
					}, {
						'$': {
							Name: 'AssociateTag',
							Value: 'kogai-22'
						}
					}, {
						'$': {
							Name: 'ItemId',
							Value: '4091870848'
						}
					}, {
						'$': {
							Name: 'Operation',
							Value: 'ItemLookup'
						}
					}, {
						'$': {
							Name: 'RelationshipType',
							Value: 'AuthorityTitle'
						}
					}, {
						'$': {
							Name: 'ResponseGroup',
							Value: 'RelatedItems, Small'
						}
					}, {
						'$': {
							Name: 'Service',
							Value: 'AWSECommerceService'
						}
					}, {
						'$': {
							Name: 'Signature',
							Value: 'y4nyDeE+TBCXccFGgXiCoGKGd6rDCTYz7RNYMgxw9ww='
						}
					}, {
						'$': {
							Name: 'Timestamp',
							Value: '2015-06-10T09:49:47Z'
						}
					}, {
						'$': {
							Name: 'Version',
							Value: '2011-08-01'
						}
					}]
				}],
				RequestProcessingTime: ['0.0841843920000000']
			}],
			Items: [{
				Request: [{
					IsValid: ['True'],
					ItemLookupRequest: [{
						IdType: ['ASIN'],
						ItemId: ['4091870848'],
						ResponseGroup: ['RelatedItems', 'Small'],
						VariationPage: ['All'],
						RelationshipType: ['AuthorityTitle']
					}]
				}],
				Item: [{
					ASIN: ['4091870848'],
					DetailPageURL: ['http://www.amazon.co.jp/%E3%81%8F%E3%83%BC%E3%81%AD%E3%82%8B%E3%81%BE%E3%82%8B%E3%81%9F-BIG-SPIRITS-COMICS-SPECIAL/dp/4091870848%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4091870848'],
					ItemLinks: [{
						ItemLink: [{
							Description: ['Add To Wishlist'],
							URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3D4091870848%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4091870848']
						}, {
							Description: ['Tell A Friend'],
							URL: ['http://www.amazon.co.jp/gp/pdp/taf/4091870848%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4091870848']
						}, {
							Description: ['All Customer Reviews'],
							URL: ['http://www.amazon.co.jp/review/product/4091870848%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4091870848']
						}, {
							Description: ['All Offers'],
							URL: ['http://www.amazon.co.jp/gp/offer-listing/4091870848%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4091870848']
						}]
					}],
					ItemAttributes: [{
						Author: ['高尾 じんぐ'],
						Manufacturer: ['小学館'],
						ProductGroup: ['Book'],
						Title: ['くーねるまるた 6 (BIG SPIRITS COMICS SPECIAL)']
					}],
					RelatedItems: [{
						Relationship: ['Parents'],
						RelationshipType: ['AuthorityTitle'],
						RelatedItemCount: ['1'],
						RelatedItemPageCount: ['1'],
						RelatedItemPage: ['1'],
						RelatedItem: [{
							Item: [{
								ASIN: ['B00Z6K2B0G'],
								ItemAttributes: [{
									ProductGroup: ['Authority Non Buyable'],
									Title: ['くーねるまるた（６） (ビッグコミックススペシャル) [LegacyTitleID: 76954858]']
								}]
							}]
						}]
					}]
				}]
			}]
		}
	}
};
