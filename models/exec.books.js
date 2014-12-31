var MongoDB = require('../models/db.books.js');
var OperationHelper = require('apac').OperationHelper;

if(process.env.AWSAccessKeyId){
	//heroku用変数
	AWSAccessKeyId = process.env.AWSAccessKeyId;
	AWSSecretAccessKey = process.env.AWSSecretAccessKey;
	AWSassociatesId = process.env.AWSassociatesId;
}else{
	//サービスサーバー用変数
	var credential = require('../credential');
	AWSAccessKeyId  = credential.amazon.AWSAccessKeyId;
	AWSSecretAccessKey  = credential.amazon.AWSSecretAccessKey;
	AWSassociatesId  = credential.amazon.AWSassociatesId;
}

var OperatonConfig = {
	endPoint :'ecs.amazonaws.jp', 
	awsId : AWSAccessKeyId, 
	awsSecret :	AWSSecretAccessKey,
	assocId : AWSassociatesId
};

var delay = 1000 * 60 ; // 1minutes

function booksSearchObj( Author ){
	// 検索条件オブジェクトのコンストラクター
	// Author , itemPages , sort
	this.SearchIndex = 'Books';
	this.BrowseNode = 465392;
	this.Condition = 'New';
	if( arguments[1] ){
		this.ItemPage = arguments[1];
	}
	this.Author = Author;
	this.ResponseGroup = 'Small , ItemAttributes , Images';
	if( arguments[2] ){
		this.Sort = arguments[2];
	}else{
		this.Sort = 'titlerank';
	}
}

module.exports = countPages;

function countPages( Author ){
	var opHelperCountPages = new OperationHelper(OperatonConfig);
	var ItemSearchObj = new booksSearchObj( Author );

	opHelperCountPages.execute( 'ItemSearch' , ItemSearchObj , function(error, results){
		if(error){
			console.error(error);
		}else{
			var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
			console.log('All pages is ' + pages);
			var ItemSearchObj = new booksSearchObj( Author , 1 );
			if( 20 < pages ){

				// 調べる年度を算出
				var currentYear = new Date().getFullYear();
				var startYear = 1950;

				for (var i = currentYear; i >= startYear; i--) {
					(function(local){
						setTimeout(function(){
							var ItemSearchObj = new booksSearchObj( Author , 1 );
							var fillterdYear = 'pubdate:during%20' + local;
							ItemSearchObj.Power = fillterdYear;
							getBooks(ItemSearchObj);
						} , delay * (currentYear - local));
					})(i);
				}
			}else{
				console.log('<10');
				getBooks(ItemSearchObj);
			}
		}
	});
}

function getBooks(ItemSearchObj){
	var opHelper = new OperationHelper(OperatonConfig);
	opHelper.execute( 'ItemSearch' , ItemSearchObj , function(error, results){
		if(results.ItemSearchErrorResponse){
			console.log('getBooks is error');
			console.log(results.ItemSearchErrorResponse.Error[0].Message[0]);
		}else{
			if(results.ItemSearchResponse.Items){
				var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
				var items = results.ItemSearchResponse.Items[0].Item;
				console.log(pages);
				if(pages === 0) return ;
				for(var i = 0; i < pages; ++i){
					(function(local){
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
	console.log('getBooksInner ' + pages);
	var opHelper = new OperationHelper(OperatonConfig);
	var ItemSearchObjInner = new booksSearchObj( ItemSearchObj.Author , pages , 'titlerank' );
	if(ItemSearchObj.Power){
		ItemSearchObjInner.Power = ItemSearchObj.Power;
	}
	opHelper.execute( 'ItemSearch' , ItemSearchObjInner , function(error, results){
		if(results.ItemSearchErrorResponse){
			console.log('getBooksInner is error' , results.ItemSearchErrorResponse.Error[0].Message[0]);
		}else{
			if(results.ItemSearchResponse.Items){
				var items = results.ItemSearchResponse.Items[0].Item;
				if(items){		
					for(var i = 0; i < items.length; ++i){
						saveBooks(items[i]);
					}
				}else{
					console.log('getBooksInner has no length');
					console.log(results.ItemSearchResponse.Items[0].Request[0].Erros[0].Error);
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
	var imgObjStore;
	var price;

	if(item.ImageSets !== undefined ){
		var imgObj = item.ImageSets[0].ImageSet[0];
		imgObjStore = parseBooksImg(imgObj);
	}else{
		imgObjStore = [{ has_img : false }];
	}

	if(itemAttr.ListPrice){
		price = itemAttr.ListPrice[0].FormattedPrice[0];
	}

	MongoDB.findOne( { ASIN : item.ASIN[0] } , function(err, books) {
		if( books ){
			console.log(books.title + ' is already existed');
			books.checkDate = new Date();
			books.save();
		}else{
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
					console.log( itemAttr.Title + ' regist is success' );
				}
			});
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