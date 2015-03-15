var Q			  			= require('q');
var ModelAuthor 		= require( 'author/lib/modelAuthor' );
var reduceListByDate = require('common/reduceListByDate');

module.exports = function( authorList ) {
  // DBから著者リストを非同期に取得する
	var d = Q.defer();

	ModelAuthor.find( {}).sort({
		lastModified: 1
	}).find( {}, function( err, result ){
		console.log( authorList.length, '人の著者が登録されている' );
		reduceListByDate( result )
		.then( function( result ){
			for (var i = 0; i < result.length; i++) {
				authorList.push(result[i].name);
			}
			console.log( authorList.length, '人の著者の処理を実行する' );
			d.resolve(authorList);
		});
	});

	return d.promise;
};
