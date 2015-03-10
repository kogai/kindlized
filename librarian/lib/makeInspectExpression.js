module.exports = function ( ASIN ){
	// 検索条件オブジェクトのコンストラクター
  this.ItemId            = ASIN
	this.ResponseGroup     = 'RelatedItems';
	this.RelationshipType  = 'AuthorityTitle';
	// this.Author 				= Author;
	// this.ResponseGroup 	= 'Small , ItemAttributes , Images';
};
