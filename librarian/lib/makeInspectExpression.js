module.exports = function ( ASIN ){
	// 検索条件オブジェクトのコンストラクター
  this.ItemId            = ASIN
	this.RelationshipType  = 'AuthorityTitle';
	this.ResponseGroup     = 'RelatedItems, Small';
	// this.Author 				= Author;
	// this.ResponseGroup 	= 'Small , ItemAttributes , Images';
};
