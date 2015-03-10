var librarian   = require( './librarian' );
var shelf       = require( './shelf' );
var Q           = require( 'q' );

Q.when()
.then( shelf )
.then( librarian )
.done( function(){
  console.log( 'all process is complete.' );
});
