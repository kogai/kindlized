var Q = require('q');
var moment = require('moment-timezone');
var makeOpConfig = require('common/makeOpConfig');
var opHelper = require('apac').OperationHelper;
var opConfig = new makeOpConfig();
var makeInspectExpression = require('librarian/lib/fetchParentASIN/makeInspectExpression');
var interval = require('common/constant').interval;
var promiseSerialize = require('common/promiseSerialize');
var log = require('common/log');

module.exports = function( booksFromDB ){
	var d = Q.defer();

	promiseSerialize( booksFromDB, callback )
	.done(function( dataObject ){
		d.resolve( dataObject.resultArray );
	});

	return d.promise;
};

var callback = function( book ){
	var def = Q.defer();
	var retryCount = 0;

	var recursionInterval = function(){
		if( retryCount > 10 ){
			// 10回以上トライしてもダメならAuthorityASINを初期値に戻して次回に繰り延べ
			book.AuthorityASIN = [''];
			book.lastModifiedLogs = {
				fetchParentASIN: moment()
			};
			def.resolve( book );
		}
	  var operationInspectBook = new opHelper( opConfig );
	  var inspectExpression = new makeInspectExpression( book.ASIN );

		operationInspectBook.execute('ItemLookup', inspectExpression, function( error, res ) {
			if ( error ) erroHandler( res );

			if ( res.ItemSearchErrorResponse ){
				// リクエスト失敗の時の処理
				erroHandler( res );
				retryCount++;
				setTimeout(function() {
					recursionInterval();
				}, retryCount * interval );
			}else{
				// リクエスト成功の時の処理
				try {
					// AuthorityASINを持っている書籍の処理
					book.AuthorityASIN = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
				}catch (e) {
					// AuthorityASINを持っていない書籍の処理
					book.AuthorityASIN = [''];
				}finally{
					book.lastModifiedLogs = {
						fetchParentASIN: moment()
					};
					def.resolve( book );
				}
			}
		});
	};
	recursionInterval();
	return def.promise;
};

var erroHandler = function( err ){
	log.info(res);
};
