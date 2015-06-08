"use strict";

require('should');

var InspectKindlize = require('Librarian/InspectKindlize');

describe('Ebookがあるか調べる', function(){
	this.timeout(0);
	var mocks = {
		hasEbook: {
			// Kindle版がある
			title: ["新装版 骨の音 (KCデラックス アフタヌーン)"],
			AuthorityASIN: ["B003UUVL2I"]
		},
		hasNotEbook: {
			// Kindle版が無い
			title: ["七夕の国　下"],
			AuthorityASIN: ["B003UUWF8W"]
		},
		exception: {
			title: ["深夜食堂 14 (ビッグコミックススペシャル)"],
			AuthorityASIN: ["B00VFG1FSE"]
		}
	}, hasEbook, hasNotEbook;

	before(function(done){
		InspectKindlize._inspect({
			AuthorityASIN: mocks.hasEbook.AuthorityASIN
		})
		.done(function(book){
			hasEbook = book;
			InspectKindlize._inspect({
				AuthorityASIN: mocks.hasNotEbook.AuthorityASIN
			})
			.done(function(book){
				hasNotEbook = book;
				done();
			});
		});
	});

	it('EbookがあればhasEbookプロパティはtrue', function(){
		(hasEbook.hasEbook).should.be.exactly(true);
	});

	it('EbookがなければhasEbookプロパティはfalse', function(){
		(hasNotEbook.hasEbook).should.be.exactly(false);
	});

	it('updateプロパティがある', function(){
		hasEbook.should.have.property('update');
	});

	it('relatedItemプロパティがある', function(){
		hasEbook.should.have.property('relatedItem');
	});

});
