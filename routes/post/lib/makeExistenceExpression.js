module.exports = function ( newBook ){
	// 検索条件オブジェクトのコンストラクター
	this.SearchIndex 	= 'Books';
    this.Title         	= newBook
	this.ResponseGroup  = 'Small';
	this.BrowseNode 	= 465392;
};
