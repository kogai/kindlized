module.exports = [{
	ASIN: ['4091870848'],
	err: null,
	res: {
		ItemLookupResponse: {
			'$': {
				xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01'
			},
			OperationRequest: [{
				RequestId: ['15cf04cf-b488-447d-8395-6926b6f76947'],
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
							Value: 'RelatedItems'
						}
					}, {
						'$': {
							Name: 'Service',
							Value: 'AWSECommerceService'
						}
					}, {
						'$': {
							Name: 'Signature',
							Value: 'hhyvH7OYL5ZI0R6OAUEVQkUCW5gmGJhny9Opr31wsv0='
						}
					}, {
						'$': {
							Name: 'Timestamp',
							Value: '2015-06-10T03:56:45Z'
						}
					}, {
						'$': {
							Name: 'Version',
							Value: '2011-08-01'
						}
					}]
				}],
				RequestProcessingTime: ['0.0080430000000000']
			}],
			Items: [{
				Request: [{
					IsValid: ['True'],
					ItemLookupRequest: [{
						IdType: ['ASIN'],
						ItemId: ['4091870848'],
						ResponseGroup: ['RelatedItems'],
						VariationPage: ['All'],
						RelationshipType: ['AuthorityTitle']
					}]
				}],
				Item: [{
					ASIN: ['4091870848'],
					RelatedItems: [{
						Relationship: ['Parents'],
						RelationshipType: ['AuthorityTitle'],
						RelatedItemCount: ['1'],
						RelatedItemPageCount: ['1'],
						RelatedItemPage: ['1'],
						RelatedItem: [{
							Item: [{
								ASIN: ['B00Z6K2B0G']
							}]
						}]
					}]
				}]
			}]
		}
	}
}, {
	title: ['七夕の国　下'],
	ASIN: ['B003UUWF8W'],
	err: null,
	res: {
		ItemLookupResponse: {
			'$': {
				xmlns: 'http://webservices.amazon.com/AWSECommerceService/2011-08-01'
			},
			OperationRequest: [{
				RequestId: ['f25ce201-ca42-4fc7-83b4-909241915172'],
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
							Value: 'B003UUWF8W'
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
							Value: 'RelatedItems'
						}
					}, {
						'$': {
							Name: 'Service',
							Value: 'AWSECommerceService'
						}
					}, {
						'$': {
							Name: 'Signature',
							Value: 'BOgxiymDUfwQNWKdVD8qcFBzELLiImPc8T6HtneBK94='
						}
					}, {
						'$': {
							Name: 'Timestamp',
							Value: '2015-06-10T04:14:33Z'
						}
					}, {
						'$': {
							Name: 'Version',
							Value: '2011-08-01'
						}
					}]
				}],
				RequestProcessingTime: ['0.0077245540000000']
			}],
			Items: [{
				Request: [{
					IsValid: ['True'],
					ItemLookupRequest: [{
						IdType: ['ASIN'],
						ItemId: ['B003UUWF8W'],
						ResponseGroup: ['RelatedItems'],
						VariationPage: ['All'],
						RelationshipType: ['AuthorityTitle']
					}]
				}],
				Item: [{
					ASIN: ['B003UUWF8W'],
					RelatedItems: [{
						Relationship: ['Children'],
						RelationshipType: ['AuthorityTitle'],
						RelatedItemCount: ['1'],
						RelatedItemPageCount: ['1'],
						RelatedItemPage: ['1'],
						RelatedItem: [{
							Item: [{
								ASIN: ['409187732X']
							}]
						}]
					}]
				}]
			}]
		}
	}
}];
