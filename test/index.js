var librarian = require('./librarian');

require('should');

describe('circleCiのテスト', function () {
  it( 'circleCiが動作している', function( done ){
    (5).should.be.exactly(5);
    done();
  });
});

librarian();
