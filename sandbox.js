// // console.log( process.env.NODE_PATH );
// console.log( process.env.NODE_PATH );
// var process.env.NODE_PATH
// var librarian = require('./librarian');
// // librarian.inspectBookList();
var testdata = require( 'test/librarian/lib/inspectBookList/testdata' );
var fs 		= require('fs');
// var file 	= fs.createWriteStream("test/librarian/lib/inspectBookList/testdata.js");

// (function( arr ){
// 	fs.readFile( 'test/librarian/lib/inspectBookList/testdata.js', 'utf8', function( err, data ){
// 		if(err) throw err;
// 		// data = data.toString();
// 		// var arrayBuffer = new Uint8Array( data ).buffer;
// 		// data = JSON.parse( data );
// 		console.log( typeof modData );
// 	});
// })();

var suc = 0;
var err = 0;
for (var i = 0; i < testdata.length; i++) {
   var items = testdata[i].ItemLookupResponse.Items[0].Item[0].RelatedItems;
   if( items ){
      // console.log( items[0].RelatedItemCount[0] );
      console.log( items[0].RelatedItem );
      suc++;
   }else{
      err++;
      // console.log( testdata[i].ItemLookupResponse.Items[0].Item[0] );
   }
   // if ( testdata[i].ItemLookupResponse ){
   //    console.log( items );
   //    // console.log( testdata[i].ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem );
   // }else{
   //    console.log( testdata[i].ItemLookupErrorResponse.Error[0].Message[0] );
   // }
   //  console.log( testdata[i].ItemLookupResponse );
}

console.log( testdata.length, 'length' );
console.log( 'success', suc );
console.log( 'error', err );
