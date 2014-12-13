var MongoDB = require('../models/db.books.js');
var credential = require('../credential');
var booksSearchObj = require('../models/constractor.booksSearchObj.js');
var Q = require('q');
var OperationHelper = require('apac').OperationHelper;
var OperatonConfig = {
	endPoint :'ecs.amazonaws.jp', 
	awsId : credential.amazon.AWSAccessKeyId, 
	awsSecret :	credential.amazon.AWSSecretAccessKey,
	assocId : credential.amazon.AWSassociatesId 
};

var delay = 1000 * 60 ; // 1minutes
var callNextFn = function ( fn, times , delay ) {
	if ( arguments[3] ){
		var obj = arguments[3];
	}
	// 再帰処理定義
	var cb = function( callback ){
		// 遅延処理
		setTimeout( function(){
			callback(obj);
			obj--;
			count++;
			if( count === times ) {
				// 規定回数実行して第四引数で受けた関数を実行
				if( next ){
					setTimeout( next, delay );
				}else{
					return;
				}
			} else {
				// 再帰処理を実行
				cb(fn);
			}
		} , delay );
	};

	// 初回処理
	var count = 1;
	fn(obj);

	// 再帰処理開始
	cb(fn);
};

function countPages( Author ){
	var opHelperCountPages = new OperationHelper(OperatonConfig);
	var ItemSearchObj = new booksSearchObj( Author );

	opHelperCountPages.execute( 'ItemSearch' , ItemSearchObj , function(error, results){
		if(error){
			console.error(error);
			return;
		}else{
			// 検索結果のページ数で処理を振り分け
			var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
			console.log( Author + 'has ' + pages);
			var ItemSearchObj = new booksSearchObj( Author , 1 );
			if( 10 < pages ){
				// 10P以上の処理
				var currentYear = new Date().getFullYear();
				var startYear = 1950;
				var times = currentYear - startYear;

				var ItemSearchObj = new booksSearchObj( Author , 1 );
				var fillterdYear = 'pubdate:during%20' + currentYear;
				ItemSearchObj.Power = fillterdYear;
				callNextFn( getBooks, times, delay, ItemSearchObj );
			}else{
				// 10P以下の処理
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
				if(pages === 0) return ;
				callNextFn( getBooksInner, pages, delay, ItemSearchObj );
				// for(var i = 0; i < pages; ++i){
				// 	(function(local){
				// 		setTimeout(function(){
				// 			getBooksInner( ItemSearchObj , local + 1 );
				// 		}, delay * local);
				// 	})(i);
				// }
			}else{
				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
				console.log(errorlog);
			}

		}
	});
}

function getBooksInner( ItemSearchObj , pages ){
	var opHelper = new OperationHelper(OperatonConfig);
	var ItemSearchObjInner = new booksSearchObj( ItemSearchObj.Author , pages , 'titlerank' );
	if(ItemSearchObj.Power){
		ItemSearchObjInner.Power = ItemSearchObj.Power;
	}
	opHelper.execute( 'ItemSearch' , ItemSearchObjInner , function(error, results){
		if(results.ItemSearchErrorResponse){
			console.log('getBooksInner is error');
			console.log(results.ItemSearchErrorResponse.Error[0].Message[0]);
			return;
		}else{
			if(results.ItemSearchResponse.Items){
				var items = results.ItemSearchResponse.Items[0].Item;
				if(items){		
					for(var i = 0; i < items.length; ++i){
						saveBooks(items[i]);
					}
				}else{
					console.log('getBooksInner has no length');
					return;
				}
			}else{
				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
				console.log(errorlog);
				return;
			}

		}
	});
}

function saveBooks(item){
	var itemAttr = item.ItemAttributes[0];
	var imgObjStore;
	if(item.ImageSets !== undefined ){
		var imgObj = item.ImageSets[0].ImageSet[0];
		imgObjStore = parseBooksImg(imgObj);
	}else{
		imgObjStore = [{ has_img : false }];
	}
	var price;
	if(itemAttr.ListPrice){
		price = itemAttr.ListPrice[0].FormattedPrice[0];
	}else{
		price = undefined;
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
					console.log('regist is success');
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

module.exports = countPages;