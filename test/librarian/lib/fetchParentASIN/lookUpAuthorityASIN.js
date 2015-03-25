var Q = require('q');
var should = require('should');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var lookUpAuthorityASIN = require('librarian/lib/fetchParentASIN/lookUpAuthorityASIN');

module.exports = function() {
	describe('librarian/lib/fetchParentASIN/lookUpAuthorityASIN.jsのテスト', function() {
		it('テストが動作している', function(done) {
			(5).should.be.exactly(5);
			done();
		});

		var bookList = [];
		this.timeout(0);

		before(function(done) {
			fetchBookList()
				.then(function(data){
					var d = Q.defer();
					lookUpAuthorityASIN(data[0])
					.done(function(book){
						data.modBookList = [];
						data.modBookList.push(book);
						d.resolve(data);
					});
					return d.promise;
				})
				.then(function(data){
					var d = Q.defer();
					lookUpAuthorityASIN(data[1])
					.done(function(book){
						data.modBookList.push(book);
						d.resolve(data);
					});
					return d.promise;
				})
				.then(function(data){
					var d = Q.defer();
					lookUpAuthorityASIN(data[2])
					.done(function(book){
						data.modBookList.push(book);
						d.resolve(data);
					});
					return d.promise;
				})
				.then(function(data){
					var d = Q.defer();
					lookUpAuthorityASIN(data[3])
					.done(function(book){
						data.modBookList.push(book);
						d.resolve(data);
					});
					return d.promise;
				})
				.then(function(data){
					var d = Q.defer();
					lookUpAuthorityASIN(data[4])
					.done(function(book){
						data.modBookList.push(book);
						d.resolve(data);
					});
					return d.promise;
				})
				.done(function(data) {
					bookList = data.modBookList;
					done();
				});
		});

		it('AuthorityASINプロパティがある', function() {
			bookList.forEach(function(book){
				book.should.have.property('AuthorityASIN');
			});
		});
		it('AuthorityASINプロパティは配列である', function() {
			bookList.forEach(function(book){
				book.AuthorityASIN.should.be.instanceof(Array);
			});
		});
		it('Authorityプロパティは空の文字列ではない', function(){
			bookList.forEach(function(book){
				book.AuthorityASIN[0].should.be.above(0);
			});
		});
		});
};
