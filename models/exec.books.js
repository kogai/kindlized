var MongoDB = require('../models/db.books.js');
var credential = require('../credential');
var OperationHelper = require('apac').OperationHelper;
var OperatonConfig = {
	endPoint :'ecs.amazonaws.jp', 
	awsId : credential.amazon.AWSAccessKeyId, 
	awsSecret :	credential.amazon.AWSSecretAccessKey,
	assocId : credential.amazon.AWSassociatesId 
}
var delay = 1000 * 60 * 5;
// var delay = 1000 * 30 ;
// var delay = 1000;

module.exports = function(){
	countPages('尾田栄一郎');
	// countPages('岩明均');
}

function countPages(Author){
	var opHelperCountPages = new OperationHelper(OperatonConfig);
	opHelperCountPages.execute( 'ItemSearch' , {
		'SearchIndex': 'Books',
		'BrowseNode': 465392,
		'Condition' : 'New',
		'Author' : Author,
	}, function(error, results){
		if(error){
			console.error(error);
		}else{
			var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
			console.log('All pages is ' + pages);
			var ItemSearchObj = {
				'SearchIndex': 'Books',
				'BrowseNode': 465392,
				'Condition' : 'New',
				'ItemPage' : 1,
				'Author' : Author,
				'ResponseGroup': 'Small , ItemAttributes , Images',
				'Sort': 'titlerank'
			}
			if( 20 < pages ){
				var currentYear = new Date();
				currentYear = currentYear.getFullYear();
				var startYear = 1950;
				for (var i = currentYear; i >= startYear; i--) {
					(function(local){
						setTimeout(function(){
							var ItemSearchObj = {
								'SearchIndex': 'Books',
								'BrowseNode': 465392,
								'Condition' : 'New',
								'ItemPage' : 1,
								'Author' : Author,
								'ResponseGroup': 'Small , ItemAttributes , Images',
								'Sort': 'titlerank'
							}
							var fillterdYear = 'pubdate:during%20' + local;
							ItemSearchObj.Power = fillterdYear;
							getBooks(ItemSearchObj);
						} , delay * (currentYear - local));
					})(i);
				}
			}else if( 10 < pages ){
				getBooks(ItemSearchObj);
				ItemSearchObj.Sort = '-titlerank';
				getBooks(ItemSearchObj);
			}else{
				getBooks(ItemSearchObj);
			}
		}
	});
}

function getBooks(ItemSearchObj){
	console.log(ItemSearchObj);
	console.log('getBooks');
	var opHelper = new OperationHelper(OperatonConfig);

	opHelper.execute( 'ItemSearch' , ItemSearchObj , function(error, results){
		if(results.ItemSearchErrorResponse){
			console.log('error');
		}else{
			if(results.ItemSearchResponse.Items){
				var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
				var items = results.ItemSearchResponse.Items[0].Item;
				console.log(pages);
				for(var i = 0; i < pages; ++i){
					(function(local){
						console.log(local);
						setTimeout(function(){
							getBooksInner( ItemSearchObj , local + 1 );
						}, delay * local);
					})(i);
				}
			}else{
				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
				console.log(errorlog);
			}

		}
	});
}

function getBooksInner( ItemSearchObj , pages ){
	console.log(pages);
	var opHelper = new OperationHelper(OperatonConfig);
	var ItemSearchObjInner = {
		'SearchIndex': 'Books',
		'BrowseNode': 465392,
		'Condition' : 'New',
		'ItemPage' : pages,
		'Author' : ItemSearchObj.Author,
		'ResponseGroup': 'Small , ItemAttributes , Images',
		'Sort': 'titlerank'
	}
	if(ItemSearchObj.Power){
		ItemSearchObjInner.Power = ItemSearchObj.Power;
	}
	opHelper.execute( 'ItemSearch' , ItemSearchObjInner , function(error, results){
		if(results.ItemSearchErrorResponse){
			console.log('error');
		}else{
			if(results.ItemSearchResponse.Items){
				var items = results.ItemSearchResponse.Items[0].Item;
				for(var i = 0; i < items.length; ++i){
					saveBooks(items[i]);
				}
			}else{
				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
				console.log(errorlog);
			}

		}
	});
}

function saveBooks(item){
	var itemAttr = item.ItemAttributes[0];

	if(item.ImageSets !== undefined ){
		var imgObj = item.ImageSets[0].ImageSet[0];
		var imgObjStore = parseBooksImg(imgObj);
	}else{
		var imgObjStore = [{ has_img : false }];
	}

	if(itemAttr.ListPrice){
		var price = itemAttr.ListPrice[0].FormattedPrice[0];
	}else{
		var price = undefined;
	}

    var newBooks = new Books({
	    title : itemAttr.Title ,
	    img : imgObjStore,
	    author : itemAttr.Author,
	    publisher : itemAttr.Manufacturer,
	    ASIN : item.ASIN[0],
	    DetailPageURL : item.DetailPageURL,
	    price : price,
	    is_kindlized : false,
	    checkDate : new Date()
    });

    newBooks.save(function(err){
        if(err){
        	console.log(err);
        }else{
            console.log('regist is success');
        }
    });
}

function parseBooksImg(imgObj){
	delete imgObj.$;
	var imgObjStore = {};
	for(var keys in imgObj){
		imgObjStore[keys] = imgObj[keys][0].URL[0];
	}
	return imgObjStore;
}

