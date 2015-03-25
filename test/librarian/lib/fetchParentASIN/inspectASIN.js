var Q = require('q');
var util = require('util');
var should = require('should');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var inspectASIN = require('librarian/lib/fetchParentASIN/inspectASIN');
var regInt = require('librarian/lib/fetchParentASIN/regInt');

module.exports = function() {
	describe('librarian/lib/fetchParentASIN/inspectASINのテスト', function() {
		it('テストが動作している', function(done) {
			(5).should.be.exactly(5);
			done();
		});

		this.timeout(0);
		var testFunc = function( initCountExec ){
			var resBook;
			var resData;
			var countExec = initCountExec;
			var countExecIncrements = initCountExec + 1;
      var d = Q.defer();

			before(function(done) {
				fetchBookList()
					.then(function(books){
						var d = Q.defer();

						var data = {};
						data.countExec = countExec;
						data.bookList = books;
						data.regularInterval = regInt;
						data.d = d;
						d.resolve( data );

						return d.promise;
					})
					.then( inspectASIN )
					.done(function( data ) {
						resBook = data.book;
						resData = data;
						done();
					});
			});

			it('dataのカウントがインクリメントしている', function() {
				resData.countExec.should.exactly( countExecIncrements );
			});

			it('ASINプロパティがあり、空の文字列ではない', function() {
				resBook.should.have.property('ASIN');
				( resBook.ASIN[0].length ).should.be.above( 0 );
			});

			it('AuthorityASINプロパティがあり、空の文字列ではない', function() {
				resBook.should.have.property('AuthorityASIN');
				( resBook.AuthorityASIN[0].length ).should.be.above( 0 );
			});

			it('lastModifiedLogsプロパティがある', function() {
				resBook.should.have.property('lastModifiedLogs');
			});

			it('lastModifiedLogsプロパティはObject型である', function() {
				resBook.lastModifiedLogs.should.be.instanceof(Object);
			});

			it('lastModifiedLogsプロパティはfetchParentASIN子プロパティを持つ', function() {
				resBook.lastModifiedLogs.should.have.property('fetchParentASIN');
			});

			it('fetchParentASIN子プロパティはDate型である', function() {
				resBook.lastModifiedLogs.fetchParentASIN.should.be.instanceof(Date);
			});
		};
		for (var i = 0; i < 10; i++) {
			testFunc(i);
		}
	});
};
