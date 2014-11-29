var Books = require('../models/db.books.js');
var credential = require('../credential');
var OperationHelper = require('apac').OperationHelper;

module.exports = function(){
	var opHelper = new OperationHelper({
		endPoint :'ecs.amazonaws.jp', 
		awsId : credential.amazon.AWSAccessKeyId, 
		awsSecret :	credential.amazon.AWSSecretAccessKey,
		assocId : credential.amazon.AWSassociatesId 
	});

	opHelper.execute( 'ItemSearch' , {
		'SearchIndex': 'Books',
		'BrowseNode': 465610,
		'MinimumPrice': 100,
		'MaximumPrice': 5000,
		'ResponseGroup': 'Small,OfferSummary',
		'Sort': 'salesrank'
	}, function(error, results){
		if(error){
			console.error(error);
		}else{
			var items = results.ItemSearchResponse.Items[0].Item;
			for(var i = 0; i < items.length; ++i){
				console.log(
					'ASIN:' + items[i].ASIN
					+ '\tTitle:' + items[i].ItemAttributes[0].Title
				);
			}
		}
	});
}