module.exports = {
	ASIN: ['B00ZEHKJ6O'],
	conditions: {
		ItemId: 'B00ZEHKJ6O'
	},
	err: null,
	res: {
		ItemLookupResponse: {
			'$': {
				xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01'
			},
			OperationRequest: [{
				RequestId: ['fdb5f975-f7b0-4250-9755-0dcaed99f1be'],
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
							Value: 'B00ZEHKJ6O'
						}
					}, {
						'$': {
							Name: 'Operation',
							Value: 'ItemLookup'
						}
					}, {
						'$': {
							Name: 'ResponseGroup',
							Value: 'ItemAttributes, Large, ItemIds'
						}
					}, {
						'$': {
							Name: 'Service',
							Value: 'AWSECommerceService'
						}
					}, {
						'$': {
							Name: 'Signature',
							Value: 'eXqtOol13wxDL/Q3N3MBvRfnkqSuQnuCGPHnTIDto1M='
						}
					}, {
						'$': {
							Name: 'Timestamp',
							Value: '2015-06-14T02:21:58Z'
						}
					}, {
						'$': {
							Name: 'Version',
							Value: '2011-08-01'
						}
					}]
				}],
				RequestProcessingTime: ['0.0790920140000000']
			}],
			Items: [{
				Request: [{
					IsValid: ['True'],
					ItemLookupRequest: [{
						IdType: ['ASIN'],
						ItemId: ['B00ZEHKJ6O'],
						ResponseGroup: ['ItemAttributes', 'Large', 'ItemIds'],
						VariationPage: ['All']
					}]
				}],
				Item: [{
					ASIN: ['B00ZEHKJ6O'],
					DetailPageURL: ['http://www.amazon.co.jp/%E3%81%BE%E3%81%A8%E3%82%81%E8%B2%B7%E3%81%84-%E5%88%83%E7%89%99%E9%81%93/dp/B00ZEHKJ6O%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00ZEHKJ6O'],
					ItemLinks: [{
						ItemLink: [{
							Description: ['Add To Wishlist'],
							URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00ZEHKJ6O%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00ZEHKJ6O']
						}, {
							Description: ['Tell A Friend'],
							URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00ZEHKJ6O%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00ZEHKJ6O']
						}, {
							Description: ['All Customer Reviews'],
							URL: ['http://www.amazon.co.jp/review/product/B00ZEHKJ6O%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00ZEHKJ6O']
						}, {
							Description: ['All Offers'],
							URL: ['http://www.amazon.co.jp/gp/offer-listing/B00ZEHKJ6O%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00ZEHKJ6O']
						}]
					}],
					SmallImage: [{
						URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL75_.png'],
						Height: [{
							_: '75',
							'$': {
								Units: 'pixels'
							}
						}],
						Width: [{
							_: '74',
							'$': {
								Units: 'pixels'
							}
						}]
					}],
					MediumImage: [{
						URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL160_.png'],
						Height: [{
							_: '160',
							'$': {
								Units: 'pixels'
							}
						}],
						Width: [{
							_: '158',
							'$': {
								Units: 'pixels'
							}
						}]
					}],
					LargeImage: [{
						URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS.png'],
						Height: [{
							_: '1414',
							'$': {
								Units: 'pixels'
							}
						}],
						Width: [{
							_: '1396',
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
								URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL30_.png'],
								Height: [{
									_: '30',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '30',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							SmallImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL75_.png'],
								Height: [{
									_: '75',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '74',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							ThumbnailImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL75_.png'],
								Height: [{
									_: '75',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '74',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							TinyImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL110_.png'],
								Height: [{
									_: '110',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '109',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							MediumImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS._SL160_.png'],
								Height: [{
									_: '160',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '158',
									'$': {
										Units: 'pixels'
									}
								}]
							}],
							LargeImage: [{
								URL: ['http://ecx.images-amazon.com/images/I/B1UprcUWMyS.png'],
								Height: [{
									_: '1414',
									'$': {
										Units: 'pixels'
									}
								}],
								Width: [{
									_: '1396',
									'$': {
										Units: 'pixels'
									}
								}]
							}]
						}]
					}],
					ItemAttributes: [{
						Author: ['板垣恵介'],
						Binding: ['Kindle版'],
						Languages: [{
							Language: [{
								Name: ['日本語'],
								Type: ['Published']
							}]
						}],
						ProductGroup: ['Ebook Bundle'],
						ProductTypeName: ['EBOOK_BUNDLE'],
						Title: ['[まとめ買い] 刃牙道']
					}],
					OfferSummary: [{
						LowestNewPrice: [{
							Amount: ['2400'],
							CurrencyCode: ['JPY'],
							FormattedPrice: ['￥ 2,400']
						}],
						TotalNew: ['1'],
						TotalUsed: ['0'],
						TotalCollectible: ['0'],
						TotalRefurbished: ['0']
					}],
					Offers: [{
						TotalOffers: ['1'],
						TotalOfferPages: ['1'],
						MoreOffersUrl: ['http://www.amazon.co.jp/gp/offer-listing/B00ZEHKJ6O%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00ZEHKJ6O'],
						Offer: [{
							OfferAttributes: [{
								Condition: ['New']
							}],
							OfferListing: [{
								OfferListingId: ['RhUMIKTKEIvWXvACKlhpkWAerTpDSbffGCCrL3%2BVFqJd%2BaOAmWBsvJUhRrn97Xi%2FWBWo4EVqjCd07vqaNitrv9o1r4NWQkqTKrOopLc7TwZViC5Ro2bz5MlYqnst8Jvd'],
								Price: [{
									Amount: ['2400'],
									CurrencyCode: ['JPY'],
									FormattedPrice: ['￥ 2,400']
								}],
								Availability: ['通常1～2営業日以内に発送'],
								AvailabilityAttributes: [{
									AvailabilityType: ['now'],
									MinimumHours: ['24'],
									MaximumHours: ['48']
								}],
								IsEligibleForSuperSaverShipping: ['0']
							}]
						}]
					}],
					CustomerReviews: [{
						IFrameURL: ['http://www.amazon.jp/reviews/iframe?akid=AKIAIJIEG4Z42Z22HDYA&alinkCode=xm2&asin=B00ZEHKJ6O&atag=kogai-22&exp=2015-06-15T02%3A21%3A58Z&v=2&sig=IXqD4HORQm90LP8qDow7CvBJjSSYgKPQ%2F6gUxApYdfQ%3D'],
						HasReviews: ['false']
					}],
					EditorialReviews: [{
						EditorialReview: [{
							Source: ['Product Description'],
							Content: ['刃牙シリーズ第四章、ついに開幕!!　地上最強の生物である父・範馬勇次郎との史上最大の親子喧嘩を終え、範馬刃牙は今…!?　一方、強き者に焦がれる徳川翁は“神に背く”空前の大実験を執り行う!!　今、強さの歴史がかわるッッ!!'],
							IsLinkSuppressed: ['0']
						}]
					}],
					BrowseNodes: [{
						BrowseNode: [{
							BrowseNodeId: ['466280'],
							Name: ['コミック・ラノベ・BL'],
							Children: [{
								BrowseNode: [{
									BrowseNodeId: ['2278488051'],
									Name: ['コミック']
								}, {
									BrowseNodeId: ['467278'],
									Name: ['ライトノベル']
								}, {
									BrowseNodeId: ['12075851'],
									Name: ['ボーイズラブコミックス']
								}, {
									BrowseNodeId: ['12075891'],
									Name: ['ボーイズラブノベルス']
								}, {
									BrowseNodeId: ['492042'],
									Name: ['イラスト集・オフィシャルブック']
								}, {
									BrowseNodeId: ['492044'],
									Name: ['コミック・アニメ研究']
								}]
							}],
							Ancestors: [{
								BrowseNode: [{
									BrowseNodeId: ['465610'],
									Name: ['ジャンル別'],
									IsCategoryRoot: ['1'],
									Ancestors: [{
										BrowseNode: [{
											BrowseNodeId: ['465392'],
											Name: ['本']
										}]
									}]
								}]
							}]
						}, {
							BrowseNodeId: ['2293143051'],
							Name: ['コミック'],
							Children: [{
								BrowseNode: [{
									BrowseNodeId: ['2430812051'],
									Name: ['少年コミック']
								}, {
									BrowseNodeId: ['2430869051'],
									Name: ['青年コミック']
								}, {
									BrowseNodeId: ['2430765051'],
									Name: ['少女コミック']
								}, {
									BrowseNodeId: ['2430737051'],
									Name: ['女性コミック']
								}, {
									BrowseNodeId: ['2430727051'],
									Name: ['4コマまんが']
								}, {
									BrowseNodeId: ['2293144051'],
									Name: ['イラスト集・オフィシャルブック']
								}, {
									BrowseNodeId: ['2293146051'],
									Name: ['コミック・アニメ研究']
								}]
							}],
							Ancestors: [{
								BrowseNode: [{
									BrowseNodeId: ['2275256051'],
									Name: ['Kindle本'],
									Ancestors: [{
										BrowseNode: [{
											BrowseNodeId: ['2250739051'],
											Name: ['カテゴリー別'],
											IsCategoryRoot: ['1'],
											Ancestors: [{
												BrowseNode: [{
													BrowseNodeId: ['2250738051'],
													Name: ['Kindleストア']
												}]
											}]
										}]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}
	}
};
