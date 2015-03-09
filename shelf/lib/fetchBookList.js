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
          data.authorData.bookList = data.authorData.bookList.concat( resBookListPerPage );
          data.countExec++;
    		}catch( err ){
    			console.log( 'fetchBookListのエラー', err, res );
    		}
        finally{
          data.regularInterval( data );
        }
    	});
    }
  };
  regInt( regIntData );
  return d.promise;
};
