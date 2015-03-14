var ModelAuthor = require( 'author/lib/modelAuthor' );

// module.exports = function( authorList ) {
  // DBから著者リストを非同期に取得する
  var opt = {
     ""name"": {
        $regex: /,/
     }
 };

  ModelAuthor.find( opt, function( err, result ) {
     console.log( err );
     console.log( result );
  });
// };
// { <field>: { $regex: /pattern/, $options: '<options>' } }

[
   { _id: 5501738fb02e7e4c409ed916,
    name: 'Peter Membrey,David Hows,Eelco Plugge',
    __v: 0,
    checkDate: [] },
  { _id: 550173ebb02e7e4c409ed92d,
    "name": '田中 可奈子,石川 由香,酒井 英樹',
    __v: 0,
    checkDate: [] },
  { _id: 5501747b32694e5e400abfb2,
    "name": "貞本 義行,GAINAX",
    __v: 0,
    checkDate: [] },
  { _id: 550173bdb02e7e4c409ed925,
    "name": "高久 尚子,はらだ,羽柴 みず,ヤマvびっこ,松田 うさち子,八川 キュウ,環 レン,清瀬 ゆき,南条 つぐみ,厘 てく,小池 マルミ",
    __v: 0,
    checkDate: [] } ]


// var Q = require('q');
//
// var funcThenable = function(){
//    var d = Q.defer();
//    d.resolve('complete');
//    return d.promise;
// };
//
// var func = function( val ){
//     var d = Q.defer();
//     //非同期処理
//     setTimeout(function(){
//         var result = val*val;
//         d.resolve(result);
//     }, 500);
//     return d.promise;
// };
//
// var arr = [1, 2, 3, 4, 5];
//
// funcThenable()
// // .all( arr.map( func ) )
// .done( function( data ){
//    console.log(data);
// });
//
// // Q.all(arr.map(func))
// //  .then(function(data){
// //     console.log(data);
// //  });
// //
//
//
// // // // console.log( process.env.NODE_PATH );
// // // console.log( process.env.NODE_PATH );
// // // var process.env.NODE_PATH
// // // var librarian = require('./librarian');
// // // // librarian.inspectBookList();
// // var testdata = require( 'test/librarian/lib/inspectBookList/testdata' );
// // var fs 		= require('fs');
// // // var file 	= fs.createWriteStream("test/librarian/lib/inspectBookList/testdata.js");
// //
// // // (function( arr ){
// // // 	fs.readFile( 'test/librarian/lib/inspectBookList/testdata.js', 'utf8', function( err, data ){
// // // 		if(err) throw err;
// // // 		// data = data.toString();
// // // 		// var arrayBuffer = new Uint8Array( data ).buffer;
// // // 		// data = JSON.parse( data );
// // // 		console.log( typeof modData );
// // // 	});
// // // })();
// //
// // var suc = 0;
// // var err = 0;
// // for (var i = 0; i < testdata.length; i++) {
// //    var items = testdata[i].ItemLookupResponse.Items[0].Item[0].RelatedItems;
// //    if( items ){
// //       // console.log( items[0].RelatedItemCount[0] );
// //       console.log( items[0].RelatedItem );
// //       suc++;
// //    }else{
// //       err++;
// //       // console.log( testdata[i].ItemLookupResponse.Items[0].Item[0] );
// //    }
// //    // if ( testdata[i].ItemLookupResponse ){
// //    //    console.log( items );
// //    //    // console.log( testdata[i].ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem );
// //    // }else{
// //    //    console.log( testdata[i].ItemLookupErrorResponse.Error[0].Message[0] );
// //    // }
// //    //  console.log( testdata[i].ItemLookupResponse );
// // }
// //
// // console.log( testdata.length, 'length' );
// // console.log( 'success', suc );
// // console.log( 'error', err );
