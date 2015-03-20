module.exports = function ( newBook ){
	// 検索条件オブジェクトのコンストラクター
	this.SearchIndex 		= 'Books';
  this.Title         	= newBook;
	this.ResponseGroup  = 'Small, ItemAttributes, Images';
	this.BrowseNode 		= 465392;
};
/*
module.exports = function ( Author ){
	// 検索条件オブジェクトのコンストラクター
	// Author , itemPages , sort
	this.SearchIndex 	= 'Books';
	this.BrowseNode 	= 465392;
	this.Condition 		= 'New';
	if( arguments[1] ){
		this.ItemPage = arguments[1];
	}
	this.Author 				= Author;
	this.ResponseGroup 	= 'Small , ItemAttributes , Images';
	if( arguments[2] ){
		this.Sort = arguments[2];
	}else{
		this.Sort = 'titlerank';
	}
};
*/
