var librarian   = require( './librarian' );
var shelf       = require( './shelf' );
var Q           = require( 'q' );

Q.when()
.then( shelf )
.then( function( bookList ){
    var d = Q.defer();
    d.resolve([]);
    return d.promise;
})
.then( librarian.fetchParentASIN )
.then( librarian.inspectBookList )
.done( function(){
  console.log( 'all process is complete.' );
});
