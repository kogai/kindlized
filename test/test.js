
var request = require('supertest');
var app = require('../app');
var req = request(app);
require('should');

describe('routes', function () {
    describe( 'indexのテスト' , function () {
        it('ログインページ', function (done) {
        	var url = '/login';
            req.get(url).end(function( err, ret) { // *
                var res = ret.res,
                    statusCode = res.statusCode,
                    text = res.text;
 
                statusCode.should.equal(200);
                text.should.containEql('ログイン');
                done();
            });
        });
        it('未ログインでホームにアクセス', function (done) {
        	var url = '/';
            req.get(url).end(function( err , ret) { // *
                var res = ret.res,
                    statusCode = res.statusCode;
                    text = res.text;
 
                statusCode.should.equal(303);
                // res.redirect.should.equal('/regist');
                text.should.containEql('新規登録');
                done();
            });
        });
	});
});