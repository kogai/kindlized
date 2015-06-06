"use strict";

/*

promiseSerializeに渡されるcallbackはPromiseオブジェクトを返す

*/

var Q = require('q');
var should = require('should');
var promiseSerialize = require('common/promiseSerialize');

describe('common/promiseSerialize.jsのテスト', function() {
	var testCount = 0;
	var itArray;
	var testArry = [];
	var i;
	for (i = 0; i < 10; i++) {
		testArry.push( i );
	}
	var testFunc = function( arrayElement ){
		var d = Q.defer();

		arrayElement = arrayElement * arrayElement;
		setTimeout(function(){
			testCount++;
			d.resolve( arrayElement );
		}, 100 );

		return d.promise;
	};

	before(function(done){
		promiseSerialize( testArry, testFunc )
		.done(function(data){
			itArray = data.resultArray;
			done();
		});
	});

	it('渡した配列のlength回だけ再帰処理をしている', function() {
		testCount.should.be.exactly(10);
	});

	it('処理が完了するとcallbackで処理した配列の要素をresolveする', function() {
		var count = 0;
		itArray.forEach(function(ele){
			ele.should.be.exactly( count * count);
			count++;
		});
	});
});
