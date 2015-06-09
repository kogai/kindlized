module.exports = {

	ASIN: ['4091870848'],
	conditions: {
		ItemId: '4091870848'
	},
	err: null,
	res: {
		ItemLookupResponse: {
			'$': {
				xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01'
			},
			OperationRequest: [{

				RequestId: ['abc2067d-423a-4f95-b199-10805997ccad'],
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
							Name: 'ResponseGroup',
							Value: 'Small , ItemAttributes , Images'
						}
					}, {
						'$': {
							Name: 'Service',
							Value: 'AWSECommerceService'
						}
					}, {
						'$': {
							Name: 'Signature',
							Value: 'MJK4kygNIlbf82Mz/1TqEcx7rHsIghvhLbiHlN9B07o='
						}
					}, {
						'$': {
							Name: 'Timestamp',
							Value: '2015-06-09T12:21:49Z'
						}
					}, {
						'$': {
							Name: 'Version',
							Value: '2011-08-01'
						}
					}]
				}],
				RequestProcessingTime: ['0.0812271810000000']
			}],
			Items: [{
				Request: [{
					IsValid: ['True'],
					ItemLookupRequest: [{
						IdType: ['ASIN'],
						ItemId: ['4091870848'],
						ResponseGroup: ['Small', 'ItemAttributes', 'Images'],
						VariationPage: ['All']
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
					SmallImage: [{
						URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL75_.jpg'],
						Height: [{
							_: '75',
							'$': {
								Units: 'pixels'
							}
						}],
						Width: [{
							_: '53',
							'$': {
								Units: 'pixels'
							}
						}]
					}],
					MediumImage: [{
						URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL160_.jpg'],
						Height: [{
							_: '160',
							'$': {
								Units: 'pixels'
							}
						}],
						Width: [{
							_: '113',
							'$': {
								Units: 'pixels'
							}
						}]
					}],
					LargeImage: [{
						URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL.jpg'],
						Height: [{
							_: '500',
							'$': {
								Units: 'pixels'
							}
						}],
						Width: [{
							_: '353',
							'$': {
								Units: 'pixels'
							}
						}]
					}],
					ImageSets: [{
						ImageSet: [{
							'$': {
								Category: 'primary'
							},
							SwatchImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL30_.jpg'],
								Height: [{
									_: '30',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '21',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							SmallImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL75_.jpg'],
								Height: [{
									_: '75',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '53',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							ThumbnailImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL75_.jpg'],
								Height: [{
									_: '75',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '53',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							TinyImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL110_.jpg'],
								Height: [{
									_: '110',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '78',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							MediumImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL._SL160_.jpg'],
								Height: [{
									_: '160',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '113',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							LargeImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/51LmblGRrzL.jpg'],
								Height: [{
									_: '500',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '353',
									'$': {
										Units: 'pixels'
									}
								}]
							}]
						}]
					}],
					ItemAttributes: [{
						Author: ['高尾 じんぐ'],
						Binding: ['コミック'],
						EAN: ['9784091870841'],
						EANList: [{
							EANListElement: ['9784091870841']
						}],
						ISBN: ['4091870848'],
						Label: ['小学館'],
						Languages: [{
							Language: [{
								Name: ['日本語'],
								Type: ['Published']
							}]
						}],
						ListPrice: [{
							Amount: ['596'],
							CurrencyCode: ['JPY'],
							FormattedPrice: ['￥ 596']
						}],
						Manufacturer: ['小学館'],
						NumberOfPages: ['103'],
						PackageDimensions: [{
							Height: [{
								_: '63',
								'$': {
									Units: 'hundredths-inches'
								}
							}],
							Length: [{
								_: '693',
								'$': {
									Units: 'hundredths-inches'
								}
							}],
							Weight: [{
								_: '35',
								'$': {
									Units: 'hundredths-pounds'
								}
							}],
							Width: [{
								_: '504',
								'$': {
									Units: 'hundredths-inches'
								}
							}]
						}],
						ProductGroup: ['Book'],
						ProductTypeName: ['ABIS_BOOK'],
						PublicationDate: ['2015-04-30'],
						Publisher: ['小学館'],
						ReleaseDate: ['2015-04-30'],
						Studio: ['小学館'],
						Title: ['くーねるまるた 6 (BIG SPIRITS COMICS SPECIAL)']
					}]
				}]
			}]
		}
	}
};
