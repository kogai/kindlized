var librarian  = require('./librarian');
var routes	  = require('./routes');

require('should');

describe('circleCiのテスト', function () {
   it( 'circleCiが動作している', function( done ){
      (5).should.be.exactly(5);
      done();
   });
});

librarian.fetchParentASIN.fetchBookList();

routes.post();
routes.saveBook.isNewBook();
