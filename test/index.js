var librarian           = require('./librarian');
var fetchBookListAmazon = require('./routes/post/lib/fetchBookListAmazon');

require('should');

describe('circleCiのテスト', function () {
  it( 'circleCiが動作している', function( done ){
    (5).should.be.exactly(5);
    done();
  });
});

librarian();
fetchBookListAmazon();
