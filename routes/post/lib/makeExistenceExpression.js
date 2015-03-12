module.exports = function ( newBook ){
	// 検索条件オブジェクトのコンストラクター
	this.SearchIndex 	= 'Books';
    this.Title         	= newBook
	this.ResponseGroup  = 'Small, ItemAttributes';
	this.BrowseNode 	= 465392;
};

// "リクエストには、必要なパラメータが含まれていません。必要なパラメータには、ItemIdなどがあります。"
// "リクエストには、使用できないパラメータの組み合わせが含まれています。IdTypeがASINである場合、 SearchIndexは使えません。"
