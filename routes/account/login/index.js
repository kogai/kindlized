var Q = require('q');

// passport認証
// comparePassword
// 認証処理実行
// レスポンス

var renderRouter = function( data ){
	var res    = data.res;
	var d      = Q.defer();

	res.send();
	d.resolve( data );

	return d.promise;
}

module.exports = function( data ){

}
