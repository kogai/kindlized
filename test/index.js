var librarian = require('test/librarian');
var routes = require('test/routes');
var common = require('test/common');

require('should');

describe('circleCiのテスト', function() {
	it('circleCiが動作している', function(done) {
		(5).should.be.exactly(5);
		done();
	});
});

librarian();
routes();
common();
