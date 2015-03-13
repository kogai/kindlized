var librarian  = require('./librarian');
var routesPost = require('./routes/post');

require('should');

describe('circleCiのテスト', function () {
  it( 'circleCiが動作している', function( done ){
    (5).should.be.exactly(5);
    done();
  });
});

librarian.fetchParentASIN.fetchBookList();
librarian.inspectBookList.siftBookList();

routesPost();
