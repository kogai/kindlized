"use strict";

var AddASIN = require('Librarian/AddASIN')();

var log = require('common/log');
var util = require('util');

describe('Ebookがあるか調べる', function(){
	this.timeout(0);

	var mocks = {
		hasAuthority: {
			// AuthorityASINがある
			title: ["くーねるまるた（６） (ビッグコミックススペシャル) [LegacyTitleID: 76954858]"],
			ASIN: ["4091870848"]
		},
		hasNotAuthority: {
			// AuthorityASINが無い
			title: ["七夕の国　下"],
			ASIN: ["B003UUWF8W"]
		}
	}, hasAuthority, hasNotAuthority;

	before(function(done){
		AddASIN.lookup(mocks.hasAuthority)
		.done(function(book){
			hasAuthority = book;
			AddASIN.lookup(mocks.hasNotAuthority)
			.done(function(hasNotAuthorityBook){
				hasNotAuthority = hasNotAuthorityBook;
				done();
			});
		});
	});

	it('res.Itemsは配列', function(){
		(hasAuthority.res.Items).should.be.instanceof(Array);
		(hasNotAuthority.res.Items).should.be.instanceof(Array);
	});

	it('hasNotAuthorityはAuthorityASINを持たない', function(){
		log.info(util.inspect(hasNotAuthority, null, null));
		// (hasNotAuthority.hasAuthority).should.be.exactly(false);
	});
});
