var MongoDB = require('../models/db.books.js');
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
		'BrowseNode': 465392,
		'Condition' : 'New',
		'ItemPage' : 1,
		'Author' : '森川ジョージ',
		'ResponseGroup': 'Small , OfferSummary',
		'Sort': 'titlerank'
		// 'Sort': '-titlerank'
	}, function(error, results){
		if(error){
			console.error(error);
		}else{
			// var err = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error;
			var items = results.ItemSearchResponse.Items[0].Item;
			console.log(results.ItemSearchResponse.Items[0].TotalPages);

			for(var i = 0; i < items.length; ++i){
				saveBooks(items[i]);
				// console.log(
				// 	'ASIN:' + items[i].ASIN
				// 	+ '\tTitle:' + items[i].ItemAttributes[0].Title
				// );
			}
		}
	});
}

function saveBooks(item){
	console.log(item);
	var itemAttr = item.ItemAttributes[0];
    var newBooks = new Books({
	    title : itemAttr.Title ,
	    // imgUrl : String,
	    author : itemAttr.Author,
	    // publisher : String,
	    ASIN : item.ASIN[0],
	    DetailPageURL : item.DetailPageURL,
	    // value : Number,
	    is_kindlized : false,
	    checkDate : new Date()
    });
    // // save to mongodb
    newBooks.save(function(err){
        if(err){
            res.render( 'regist', {
                title : 'エラー',
                is_visible : 'show',
                caution : err.errors.mail.message
            });
        }else{
            console.log('regist is success');
            // res.redirect( 303, '/login');
        }
    });
}
/*
{ ASIN: [ '4063334015' ],
  DetailPageURL: [ 'http://www.amazon.co.jp/%E3%81%AF%E3%81%98%E3%82%81%E3%81%AE%E4%B8%80%E6%AD%A9-CD-BOOK-%E6%A3%AE%E5%B7%9D%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%B8/dp/4063334015%3FSubscriptionId%3DAKIAIVJX5EZ4M3Z4AS2A%26tag%3Dkogai-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4063334015' ],
  ItemLinks: [ { ItemLink: [Object] } ],
  ItemAttributes: 
   [ { Author: [Object],
       Creator: [Object],
       Manufacturer: [Object],
       ProductGroup: [Object],
       Title: [Object] } ],
  OfferSummary: 
   [ { LowestUsedPrice: [Object],
       TotalNew: [Object],
       TotalUsed: [Object],
       TotalCollectible: [Object],
       TotalRefurbished: [Object] } ] }
*/