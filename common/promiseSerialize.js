"use strict";

/*
配列とThenableな関数を渡すと配列の各要素に対して
直列に非同期処理を実行する
*/

var Q = require('q');

module.exports = function( array, callback ){

	var result = Q({
		array: array,
		resultArray: [],
		count: 0
	});

	array.forEach(function(array){
		result = result.then(function(data){
			var deferd = Q.defer();
			var ele = data.array[data.count];
			data.count++;

			callback(ele)
			.done(function(res){
				data.resultArray.push(res);
				deferd.resolve( data );
			});

			return deferd.promise;
		});
	});
	return result;

};
