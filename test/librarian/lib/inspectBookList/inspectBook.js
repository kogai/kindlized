"use strict";

var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var inspectBook = require('librarian/lib/inspectBookList/inspectBook');
var testdata = require('test/librarian/lib/inspectBookList/testdata');

var should = require('should');
var Q = require('q');
var fs = require('fs');

describe('librarian/lib/inspectBookList/inspectBook.jsのテスト', function() {
	it('テストが動作している', function(done) {
		(5).should.be.exactly(5);
		done();
	});

	var bookList;
	this.timeout(0);

	before(function(done) {
		Q.when(testdata)
			.done(function(bookListInAmazon) {
				console.log(bookListInAmazon.length + '=580');
				bookList = bookListInAmazon;
				done();
			});
	});

	it('fetchBookListはbookList配列を返す', function() {
		bookList.should.be.instanceof(Array);
	});

	it('bookList配列には内部にRelatedItemsプロパティがある', function() {
		var i;
		for (i = 0; i < bookList.length; i++) {
			bookList[i].ItemLookupResponse.Items[0].Item[0].should.have.property('RelatedItems');
		}
	});

	it('関連商品のAuthorityASINとの関係はChildrenである', function() {
		var i, items;
		for (i = 0; i < bookList.length; i++) {
			items = bookList[i].ItemLookupResponse.Items[0].Item[0].RelatedItems;
			items[0].Relationship[0].should.equal('Children');
		}
	});

	it('関連商品の数が(パラメータの)関連商品ページの数と同じ', function() {
		var i, items, itemCount, itemCountParmeter;
		for (i = 0; i < bookList.length; i++) {
			items = bookList[i].ItemLookupResponse.Items[0].Item[0].RelatedItems;
			itemCount = items[0].RelatedItem.length;
			itemCountParmeter = Number(items[0].RelatedItemCount[0]);
			itemCount.should.equal(itemCountParmeter);
		}
	});

});
