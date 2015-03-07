// function getBooks(ItemSearchObj){
// 	var opHelper = new OperationHelper(OperatonConfig);
//
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
// 						setTimeout(function(){
// 							getBooksInner( ItemSearchObj , local + 1 );
// 						}, delay * local);
// 					})(i);
// 				}
// 			}else{
// 				var errorlog = results.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0];
// 				console.log(errorlog);
// 			}
//
// 		}
// 	});
// }

var opHelper 						 = require( 'apac' ).OperationHelper;
var makeOpConfig 				 = require( './makeOpConfig' );
var makeSearchExpression = require( './makeSearchExpression' );
var regInt               = require( './regInt' );
var Q 									 = require( 'q' );

module.exports = function( authorData ){
	var Author 				= authorData.author;
	var pageCount 		= authorData.pageCount;
	var opConfig 			= new makeOpConfig();
	var opCountPages 	= new opHelper( opConfig );
	var d 						= Q.defer();

  authorData.bookList = [];

  // ページ数分実行
  var regIntData = {
    times      : pageCount,
    interval   : 300,
    obj        : {},
    d          : d,
    authorData : authorData,
    callBack   : function( data ){
    	var searchExpression 	= new makeSearchExpression( Author, data.countExec + 1 );
      opCountPages.execute( 'ItemSearch', searchExpression,  function( err, res ){
    		if( err ) throw err;
    		try{
          var resBookListPerPage = res.ItemSearchResponse.Items[0].Item;
              resBookListPerPage = JSON.parse( resBookListPerPage );
          data.authorData.bookList.concat( resBookListPerPage );
          data.countExec++;
          data.regularInterval( data );
    		}catch( err ){
    			console.log( 'fetchBookListのエラー', err );
    			throw err;
    		}
    	});
    }
  };
  regInt( regIntData );
  return d.promise;
};
