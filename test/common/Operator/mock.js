var res = {};
res = {
	ItemSearchErrorResponse: {
		'$': {
			xmlns: 'http://ecs.amazonaws.com/doc/2011-08-01/'
		},
		Error: [{
			Code: ['SignatureDoesNotMatch'],
			Message: ['The request signature we calculated does not match the signature you provided. Check your AWS Secret Access Key and signing method. Consult the service documentation for details.']
		}],
		RequestId: ['a062c2a7-c621-4ab6-b6d5-67e583ec8eb3']
	},
	ItemSearchResponse: {
		'$': {
			xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01'
		},
		OperationRequest: [{

			RequestId: ['eb85df60-fae5-4cdd-aad8-61a807b63ed4'],
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
						Name: 'BrowseNode',
						Value: '465392'
					}
				}, {
					'$': {
						Name: 'Condition',
						Value: 'New'
					}
				}, {
					'$': {
						Name: 'Operation',
						Value: 'ItemSearch'
					}
				}, {
					'$': {
						Name: 'ResponseGroup',
						Value: 'Small, ItemAttributes, Images'
					}
				}, {
					'$': {
						Name: 'SearchIndex',
						Value: 'Books'
					}
				}, {
					'$': {
						Name: 'Service',
						Value: 'AWSECommerceService'
					}
				}, {
					'$': {
						Name: 'Signature',
						Value: 'hqZdrWnMfc+b8CPewJjhn0nGAZBMne7EsTBHT9yGmnU='
					}
				}, {
					'$': {
						Name: 'Timestamp',
						Value: '2015-06-11T16:26:29Z'
					}
				}, {
					'$': {
						Name: 'Title',
						Value: '刃牙道'
					}
				}, {
					'$': {
						Name: 'Version',
						Value: '2011-08-01'
					}
				}]
			}],
			RequestProcessingTime: ['0.0437390000000000']
		}],
		Items: [{
			Request: [{
				IsValid: ['True'],
				ItemSearchRequest: [{
					BrowseNode: ['465392'],
					Condition: ['New'],
					ResponseGroup: ['Small', 'ItemAttributes', 'Images'],
					SearchIndex: ['Books'],
					Title: ['刃牙道']
				}]
			}],
			TotalResults: ['11'],
			TotalPages: ['2'],
			MoreSearchResultsUrl: ['http://www.amazon.co.jp/gp/redirect.html?linkCode=xm2&SubscriptionId=AKIAIJIEG4Z42Z22HDYA&location=http%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fsearch%3Fnode%3D465392%26keywords%3D%25E5%2588%2583%25E7%2589%2599%25E9%2581%2593%26url%3Dsearch-alias%253Dbooks-single-index&tag=kogai-22&creative=5143&camp=2025'],
			Item: [{
				ASIN: ['B00YTN19K4'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-6-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B-ebook/dp/B00YTN19K4%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00YTN19K4'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00YTN19K4%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00YTN19K4']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00YTN19K4%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00YTN19K4']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00YTN19K4%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00YTN19K4']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00YTN19K4%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00YTN19K4']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '49',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '104',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '324',
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
							URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '19',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '71',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '104',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51azP1eBiPL.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '324',
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
					Format: ['Kindle本'],
					IsAdultProduct: ['0'],
					Label: ['秋田書店'],
					Languages: [{
						Language: [{
							Name: ['日本語'],
							Type: ['Published']
						}]
					}],
					Manufacturer: ['秋田書店'],
					ProductGroup: ['eBooks'],
					ProductTypeName: ['ABIS_EBOOKS'],
					PublicationDate: ['2015-06-08'],
					Publisher: ['秋田書店'],
					ReleaseDate: ['2015-06-08'],
					Studio: ['秋田書店'],
					Title: ['刃牙道　6 (少年チャンピオン・コミックス)']
				}]
			}, {
				ASIN: ['B00U6780RM'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-5-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B-ebook/dp/B00U6780RM%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00U6780RM'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00U6780RM%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00U6780RM']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00U6780RM%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00U6780RM']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00U6780RM%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00U6780RM']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00U6780RM%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00U6780RM']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '49',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '104',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '324',
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
							URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '19',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '71',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '104',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/510cdzJgpDL.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '324',
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
					Format: ['Kindle本'],
					IsAdultProduct: ['0'],
					Label: ['秋田書店'],
					Languages: [{
						Language: [{
							Name: ['日本語'],
							Type: ['Published']
						}]
					}],
					Manufacturer: ['秋田書店'],
					ProductGroup: ['eBooks'],
					ProductTypeName: ['ABIS_EBOOKS'],
					PublicationDate: ['2015-03-06'],
					Publisher: ['秋田書店'],
					ReleaseDate: ['2015-03-06'],
					Studio: ['秋田書店'],
					Title: ['刃牙道　5 (少年チャンピオン・コミックス)']
				}]
			}, {
				ASIN: ['4253223443'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-4-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B/dp/4253223443%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4253223443'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3D4253223443%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223443']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/4253223443%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223443']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/4253223443%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223443']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/4253223443%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223443']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '49',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '104',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '324',
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
							URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '19',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '71',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '104',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51Gt%2Bced5eL.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '324',
								'$': {
									Units: 'pixels'
								}
							}]
						}]
					}]
				}],
				ItemAttributes: [{
					Author: ['板垣恵介'],
					Binding: ['コミック'],
					EAN: ['9784253223447'],
					EANList: [{
						EANListElement: ['9784253223447']
					}],
					ISBN: ['4253223443'],
					Label: ['秋田書店'],
					Languages: [{
						Language: [{
							Name: ['日本語'],
							Type: ['Published']
						}]
					}],
					ListPrice: [{
						Amount: ['463'],
						CurrencyCode: ['JPY'],
						FormattedPrice: ['￥ 463']
					}],
					Manufacturer: ['秋田書店'],
					NumberOfPages: ['182'],
					PackageDimensions: [{
						Height: [{
							_: '79',
							'$': {
								Units: 'hundredths-inches'
							}
						}],
						Length: [{
							_: '677',
							'$': {
								Units: 'hundredths-inches'
							}
						}],
						Weight: [{
							_: '40',
							'$': {
								Units: 'hundredths-pounds'
							}
						}],
						Width: [{
							_: '441',
							'$': {
								Units: 'hundredths-inches'
							}
						}]
					}],
					ProductGroup: ['Book'],
					ProductTypeName: ['ABIS_BOOK'],
					PublicationDate: ['2015-01-08'],
					Publisher: ['秋田書店'],
					ReleaseDate: ['2015-01-08'],
					Studio: ['秋田書店'],
					Title: ['刃牙道 4 (少年チャンピオン・コミックス)']
				}]
			}, {
				ASIN: ['B00P76KPAW'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-3-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B-ebook/dp/B00P76KPAW%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00P76KPAW'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00P76KPAW%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00P76KPAW']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00P76KPAW%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00P76KPAW']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00P76KPAW%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00P76KPAW']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00P76KPAW%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00P76KPAW']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '49',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '104',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '324',
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
							URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '19',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '71',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '104',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51JLiQ-NV5L.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '324',
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
					Format: ['Kindle本'],
					IsAdultProduct: ['0'],
					Label: ['秋田書店'],
					Languages: [{
						Language: [{
							Name: ['日本語'],
							Type: ['Published']
						}]
					}],
					Manufacturer: ['秋田書店'],
					ProductGroup: ['eBooks'],
					ProductTypeName: ['ABIS_EBOOKS'],
					PublicationDate: ['2014-11-07'],
					Publisher: ['秋田書店'],
					ReleaseDate: ['2014-11-07'],
					Studio: ['秋田書店'],
					Title: ['刃牙道　3 少年チャンピオン・コミックス']
				}]
			}, {
				ASIN: ['4253223427'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-2-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3-%E6%81%B5%E4%BB%8B/dp/4253223427%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4253223427'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3D4253223427%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223427']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/4253223427%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223427']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/4253223427%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223427']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/4253223427%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3D4253223427']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '47',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '101',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '316',
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
							URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '19',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '47',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '47',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '70',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '101',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51oONEmovgL.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '316',
								'$': {
									Units: 'pixels'
								}
							}]
						}]
					}]
				}],
				ItemAttributes: [{
					Author: ['板垣 恵介'],
					Binding: ['コミック'],
					EAN: ['9784253223423'],
					EANList: [{
						EANListElement: ['9784253223423']
					}],
					ISBN: ['4253223427'],
					Label: ['秋田書店'],
					ListPrice: [{
						Amount: ['463'],
						CurrencyCode: ['JPY'],
						FormattedPrice: ['￥ 463']
					}],
					Manufacturer: ['秋田書店'],
					PackageDimensions: [{
						Height: [{
							_: '79',
							'$': {
								Units: 'hundredths-inches'
							}
						}],
						Length: [{
							_: '677',
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
							_: '449',
							'$': {
								Units: 'hundredths-inches'
							}
						}]
					}],
					ProductGroup: ['Book'],
					ProductTypeName: ['ABIS_BOOK'],
					PublicationDate: ['2014-08-08'],
					Publisher: ['秋田書店'],
					ReleaseDate: ['2014-08-08'],
					Studio: ['秋田書店'],
					Title: ['刃牙道 2 (少年チャンピオン・コミックス)']
				}]
			}, {
				ASIN: ['B00JR0Q0YO'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-1-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B-ebook/dp/B00JR0Q0YO%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00JR0Q0YO'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00JR0Q0YO%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00JR0Q0YO']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00JR0Q0YO%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00JR0Q0YO']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00JR0Q0YO%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00JR0Q0YO']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00JR0Q0YO%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00JR0Q0YO']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '49',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '104',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '324',
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
							URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '19',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '49',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '71',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '104',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51nypaAQYeL.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '324',
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
					Format: ['Kindle本'],
					IsAdultProduct: ['0'],
					Label: ['秋田書店'],
					Languages: [{
						Language: [{
							Name: ['日本語'],
							Type: ['Published']
						}]
					}],
					Manufacturer: ['秋田書店'],
					ProductGroup: ['eBooks'],
					ProductTypeName: ['ABIS_EBOOKS'],
					PublicationDate: ['2014-05-08'],
					Publisher: ['秋田書店'],
					ReleaseDate: ['2014-05-08'],
					Studio: ['秋田書店'],
					Title: ['刃牙道 1 (少年チャンピオン・コミックス)']
				}]
			}, {
				ASIN: ['B00USQ76SA'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF-1-5%E5%B7%BB%E3%82%BB%E3%83%83%E3%83%88-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B/dp/B00USQ76SA%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00USQ76SA'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00USQ76SA%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00USQ76SA']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00USQ76SA%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00USQ76SA']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00USQ76SA%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00USQ76SA']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00USQ76SA%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00USQ76SA']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL75_.jpg'],
					Height: [{
						_: '74',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL160_.jpg'],
					Height: [{
						_: '158',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L.jpg'],
					Height: [{
						_: '494',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '500',
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
							URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL30_.jpg'],
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
							URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL75_.jpg'],
							Height: [{
								_: '74',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL75_.jpg'],
							Height: [{
								_: '74',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL110_.jpg'],
							Height: [{
								_: '109',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L._SL160_.jpg'],
							Height: [{
								_: '158',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61JaWpo-21L.jpg'],
							Height: [{
								_: '494',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}]
						}]
					}]
				}],
				ItemAttributes: [{
					Author: ['板垣恵介'],
					Binding: ['コミック'],
					IsAdultProduct: ['0'],
					IsEligibleForTradeIn: ['1'],
					Label: ['秋田書店'],
					ListPrice: [{
						Amount: ['2317'],
						CurrencyCode: ['JPY'],
						FormattedPrice: ['￥ 2,317']
					}],
					Manufacturer: ['秋田書店'],
					PackageDimensions: [{
						Height: [{
							_: '299',
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
							_: '185',
							'$': {
								Units: 'hundredths-pounds'
							}
						}],
						Width: [{
							_: '457',
							'$': {
								Units: 'hundredths-inches'
							}
						}]
					}],
					ProductGroup: ['Book'],
					ProductTypeName: ['ABIS_BOOK'],
					PublicationDate: ['2015-03-06'],
					Publisher: ['秋田書店'],
					Studio: ['秋田書店'],
					Title: ['刃牙道 コミック 1-5巻セット (少年チャンピオン・コミックス)'],
					TradeInValue: [{
						Amount: ['1'],
						CurrencyCode: ['JPY'],
						FormattedPrice: ['￥ 1']
					}]
				}]
			}, {
				ASIN: ['B00SGGYWRC'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF-1-4%E5%B7%BB%E3%82%BB%E3%83%83%E3%83%88-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3%E6%81%B5%E4%BB%8B/dp/B00SGGYWRC%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00SGGYWRC'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00SGGYWRC%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00SGGYWRC']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00SGGYWRC%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00SGGYWRC']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00SGGYWRC%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00SGGYWRC']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00SGGYWRC%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00SGGYWRC']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL75_.jpg'],
					Height: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '69',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL160_.jpg'],
					Height: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '148',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L.jpg'],
					Height: [{
						_: '500',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '462',
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
							URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL30_.jpg'],
							Height: [{
								_: '30',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '28',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						SmallImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '69',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL75_.jpg'],
							Height: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '69',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL110_.jpg'],
							Height: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '102',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L._SL160_.jpg'],
							Height: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '148',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/61cA160aY-L.jpg'],
							Height: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '462',
								'$': {
									Units: 'pixels'
								}
							}]
						}]
					}]
				}],
				ItemAttributes: [{
					Author: ['板垣恵介'],
					Binding: ['コミック'],
					IsAdultProduct: ['0'],
					Label: ['秋田書店'],
					ListPrice: [{
						Amount: ['1853'],
						CurrencyCode: ['JPY'],
						FormattedPrice: ['￥ 1,853']
					}],
					Manufacturer: ['秋田書店'],
					PackageDimensions: [{
						Height: [{
							_: '228',
							'$': {
								Units: 'hundredths-inches'
							}
						}],
						Length: [{
							_: '701',
							'$': {
								Units: 'hundredths-inches'
							}
						}],
						Weight: [{
							_: '150',
							'$': {
								Units: 'hundredths-pounds'
							}
						}],
						Width: [{
							_: '472',
							'$': {
								Units: 'hundredths-inches'
							}
						}]
					}],
					ProductGroup: ['Book'],
					ProductTypeName: ['ABIS_BOOK'],
					PublicationDate: ['2015-01-08'],
					Publisher: ['秋田書店'],
					Studio: ['秋田書店'],
					Title: ['刃牙道 コミック 1-4巻セット (少年チャンピオン・コミックス)']
				}]
			}, {
				ASIN: ['B00PTMK0SG'],
				DetailPageURL: ['http://www.amazon.co.jp/%E5%88%83%E7%89%99%E9%81%93-%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF-1-3%E5%B7%BB%E3%82%BB%E3%83%83%E3%83%88-%E5%B0%91%E5%B9%B4%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E6%9D%BF%E5%9E%A3/dp/B00PTMK0SG%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00PTMK0SG'],
				ItemLinks: [{
					ItemLink: [{
						Description: ['Add To Wishlist'],
						URL: ['http://www.amazon.co.jp/gp/registry/wishlist/add-item.html%3Fasin.0%3DB00PTMK0SG%26SubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00PTMK0SG']
					}, {
						Description: ['Tell A Friend'],
						URL: ['http://www.amazon.co.jp/gp/pdp/taf/B00PTMK0SG%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00PTMK0SG']
					}, {
						Description: ['All Customer Reviews'],
						URL: ['http://www.amazon.co.jp/review/product/B00PTMK0SG%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00PTMK0SG']
					}, {
						Description: ['All Offers'],
						URL: ['http://www.amazon.co.jp/gp/offer-listing/B00PTMK0SG%3FSubscriptionId%3DAKIAIJIEG4Z42Z22HDYA%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D5143%26creativeASIN%3DB00PTMK0SG']
					}]
				}],
				SmallImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL75_.jpg'],
					Height: [{
						_: '42',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '75',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				MediumImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL160_.jpg'],
					Height: [{
						_: '90',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '160',
						'$': {
							Units: 'pixels'
						}
					}]
				}],
				LargeImage: [{
					URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL.jpg'],
					Height: [{
						_: '281',
						'$': {
							Units: 'pixels'
						}
					}],
					Width: [{
						_: '500',
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
							URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL30_.jpg'],
							Height: [{
								_: '17',
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
							URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL75_.jpg'],
							Height: [{
								_: '42',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						ThumbnailImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL75_.jpg'],
							Height: [{
								_: '42',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '75',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						TinyImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL110_.jpg'],
							Height: [{
								_: '62',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '110',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						MediumImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL._SL160_.jpg'],
							Height: [{
								_: '90',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '160',
								'$': {
									Units: 'pixels'
								}
							}]
						}],
						LargeImage: [{
							URL: ['http://ecx.images-amazon.com/images/I/51ArmngGqqL.jpg'],
							Height: [{
								_: '281',
								'$': {
									Units: 'pixels'
								}
							}],
							Width: [{
								_: '500',
								'$': {
									Units: 'pixels'
								}
							}]
						}]
					}]
				}],
				ItemAttributes: [{
					Author: ['板垣 恵介'],
					Binding: ['コミック'],
					IsAdultProduct: ['0'],
					Label: ['秋田書店'],
					ListPrice: [{
						Amount: ['1390'],
						CurrencyCode: ['JPY'],
						FormattedPrice: ['￥ 1,390']
					}],
					Manufacturer: ['秋田書店'],
					PackageDimensions: [{
						Height: [{
							_: '173',
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
							_: '115',
							'$': {
								Units: 'hundredths-pounds'
							}
						}],
						Width: [{
							_: '457',
							'$': {
								Units: 'hundredths-inches'
							}
						}]
					}],
					ProductGroup: ['Book'],
					ProductTypeName: ['ABIS_BOOK'],
					PublicationDate: ['2014-11-07'],
					Publisher: ['秋田書店'],
					Studio: ['秋田書店'],
					Title: ['刃牙道 コミック 1-3巻セット (少年チャンピオン・コミックス)']
				}]
			}, {
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
				}]
			}]
		}]
	}
};
