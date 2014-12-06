var Books = require('../models/db.books.js');
var credential = require('../credential');
var Q = require('q');
var OperationHelper = require('apac').OperationHelper;
var OperatonConfig = {
	endPoint :'ecs.amazonaws.jp', 
	awsId : credential.amazon.AWSAccessKeyId, 
	awsSecret :	credential.amazon.AWSSecretAccessKey,
	assocId : credential.amazon.AWSassociatesId 
};
var delay = 1000 * 60 ; // 1minutes
var AuthorObj = {};

function booksSearchObj( Author ){
	this.SearchIndex = 'Books';
	this.BrowseNode = 465392;
	this.Condition = 'New';
	if( arguments[1] ){
		this.itemPages = arguments[1];
	}
	this.Author = Author;
	this.ResponseGroup = 'Small , ItemAttributes , Images';
	if( arguments[2] ){
		this.Sort = arguments[2];
	}else{
		this.Sort = 'titlerank';
	}
}

module.exports = function(Author){
	AuthorObj.Author = Author;
	Q.when(AuthorObj)
	.then(countPages)
	.then(branchingPages)
	// .then(step)
	.catch(function(err){
		console.log(err);
	})
	.done();
}

// function step(inc){
// 	books(authorsTest[inc]);
// 	var d = Q.defer();
// 	inc++;
// 	d.resolve(inc);
// 	return d.promise;
// }

function countPages(AuthorObj){
	var opHelperCountPages = new OperationHelper(OperatonConfig);
	var ItemSearchObj = new booksSearchObj( AuthorObj.Author );
	var d = Q.defer();
	opHelperCountPages.execute( 'ItemSearch' , ItemSearchObj , function( error , results){
		if(error){
			console.error('error');
			return;
		}else{
			var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
			AuthorObj.page = pages;
			d.resolve( AuthorObj );
		}
	});
	return d.promise;
}

function branchingPages( AuthorObj ){
	console.log(AuthorObj);
	var opHelperCountPages = new OperationHelper(OperatonConfig);
	var ItemSearchObj = new booksSearchObj( AuthorObj.Author , 1 );
	// if( 20 < pages ){
	// 	var currentYear = new Date();
	// 	currentYear = currentYear.getFullYear();
	// 	var startYear = 1950;
	// 	for (var i = currentYear; i >= startYear; i--) {
	// 		(function(local){
	// 			setTimeout(function(){
	// 				var ItemSearchObj = new booksSearchObj( Author , 1 );
	// 				var fillterdYear = 'pubdate:during%20' + local;
	// 				ItemSearchObj.Power = fillterdYear;
	// 				getBooks(ItemSearchObj);
	// 			} , delay * (currentYear - local));
	// 		})(i);
	// 	}
	// }else if( 10 < pages ){
	// 	console.log('10< executed onece');
	// 	getBooks(ItemSearchObj);
	// 	// ItemSearchObj.Sort = '-titlerank';
	// 	console.log('10< executed twice');
	// 	setTimeout(function(){
	// 		var ItemSearchObj = new booksSearchObj( Author , 1 , '-titlerank' );
	// 		getBooks(ItemSearchObj);
	// 	} , delay );
	// }else{
	// 	console.log('<10');
	// 	getBooks(ItemSearchObj);
	// }
}
// function getBooks(ItemSearchObj){
// 	console.log(ItemSearchObj);
// 	console.log('getBooks');
// 	var opHelper = new OperationHelper(OperatonConfig);

// 	opHelper.execute( 'ItemSearch' , ItemSearchObj , function(error, results){
// 		if(results.ItemSearchErrorResponse){
// 			console.log('getBooks is error');
// 			console.log(results.ItemSearchErrorResponse.Error[0].Message[0]);
// 		}else{
// 			if(results.ItemSearchResponse.Items){
// 				var pages = Number(results.ItemSearchResponse.Items[0].TotalPages[0]);
// 				var items = results.ItemSearchResponse.Items[0].Item;
// 				console.log(pages);
// 				if(pages === 0) return ;
// 				for(var i = 0; i < pages; ++i){
// 					(function(local){
// 						// console.log(local);
// 						setTimeout(function(){
// 							getBooksInner( ItemSearchObj , local + 1 );
// 						}, delay * local);
// 					})(i);
// 				}
// 			}else{
// 				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
// 				console.log(errorlog);
// 			}

// 		}
// 	});
// }

// function getBooksInner( ItemSearchObj , pages ){
// 	console.log(pages);
// 	var opHelper = new OperationHelper(OperatonConfig);
// 	var ItemSearchObjInner = new booksSearchObj( ItemSearchObj.Author , pages , 'titlerank' );
// 	if(ItemSearchObj.Power){
// 		ItemSearchObjInner.Power = ItemSearchObj.Power;
// 	}
// 	opHelper.execute( 'ItemSearch' , ItemSearchObjInner , function(error, results){
// 		if(results.ItemSearchErrorResponse){
// 			console.log('getBooksInner is error');
// 			console.log(results.ItemSearchErrorResponse.Error[0].Message[0]);
// 		}else{
// 			if(results.ItemSearchResponse.Items){
// 				var items = results.ItemSearchResponse.Items[0].Item;
// 				if(items){		
// 					for(var i = 0; i < items.length; ++i){
// 						saveBooks(items[i]);
// 					}
// 				}else{
// 					console.log('getBooksInner has no length');
// 					console.log(results.ItemSearchResponse.Items[0].Request[0].Erros[0].Error);
// 				}
// 			}else{
// 				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
// 				console.log(errorlog);
// 			}

// 		}
// 	});
// }

// function saveBooks(item){
// 	var itemAttr = item.ItemAttributes[0];

// 	if(item.ImageSets !== undefined ){
// 		var imgObj = item.ImageSets[0].ImageSet[0];
// 		var imgObjStore = parseBooksImg(imgObj);
// 	}else{
// 		var imgObjStore = [{ has_img : false }];
// 	}

// 	if(itemAttr.ListPrice){
// 		var price = itemAttr.ListPrice[0].FormattedPrice[0];
// 	}else{
// 		var price = undefined;
// 	}

// 	MongoDB.findOne( { ASIN : item.ASIN[0] } , function(err, books) {
// 		if( books ){
// 			console.log(books.title + ' is already existed');
// 			books.checkDate = new Date();
// 			books.save();
// 		}else{
// 			var newBooks = new Books({
// 				title : itemAttr.Title ,
// 				img : imgObjStore,
// 				author : itemAttr.Author,
// 				publisher : itemAttr.Manufacturer,
// 				ASIN : item.ASIN[0],
// 				DetailPageURL : item.DetailPageURL,
// 				price : price,
// 				is_kindlized : false,
// 				checkDate : new Date()
// 			});

// 			newBooks.save(function(err){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log('regist is success');
// 				}
// 			});
// 		}
// 	});
// }

// function parseBooksImg(imgObj){
// 	delete imgObj.$;
// 	var imgObjStore = {};
// 	for(var keys in imgObj){
// 		imgObjStore[keys] = imgObj[keys][0].URL[0];
// 	}
// 	return imgObjStore;
// }