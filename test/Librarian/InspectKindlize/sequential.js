"use strict";

require('should');
var Q = require('q');

var InspectKindlize = require('Librarian/InspectKindlize');

describe('配列毎に非同期処理を順番に実行する', function(){
	this.timeout(0);

	var Books = [], mock = [1, 2, 3, 4, 5];
	InspectKindlize.inspect = function(book){
		var d = Q.defer();
		setTimeout(function(){
			console.log(book);
			Books.push(book);
			d.resolve(Books);
		}, 1000);
		return d.promise;
	};

	before(function(done){
		InspectKindlize.sequential(mock).done(function(){
			done();
		});
	});

	it("配列の数が同じ", function(){
		(Books.length).should.exactly(mock.length);
	});

	it("シークエンシャルに処理が実行されている", function(){
		var i, result = true;
		for (i = 0; i < Books.length; i++) {
			if(Books[i] !== mock[i]){
				result = false;
			}
		}
		result.should.exactly(true);
	});
});
