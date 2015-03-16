var arr = [ 'my', 'test', 'array', 'is', 'here' ];
arr.splice( 0, 1 );

console.log(arr);


// var moment = require('moment-timezone');
//
// var currentDay = new Date();
// currentDay.setDate( currentDay.getDate() - 30 );
// var date = moment( currentDay );
//
// console.log( '\n', date._d, '\n' );
//
// // var Q	 = require( 'q' );
// // var fs	= require('fs');
// //
// // var regInt					= require('shelf/lib/regInt');
// // var fetchAuthor     = require('shelf/lib/fetchAuthor');
// // var fetchPageCounts = require('shelf/lib/fetchPageCounts');
// // var fetchBookList	  = require('shelf/lib/fetchBookList');
// // var modifyBookList	= require('shelf/lib/modifyBookList');
// // var saveBookList		= require('shelf/lib/saveBookList');
// // var constant				= require('shelf/lib/constant');
// //
// // var authorRecursionCount = 0;
// //
// // (function( authorList ){
// // 	var defered = Q.defer();
// //    var data = {
// //       times		: authorList.length,
// //       interval : constant.interval,
// //       obj			: {},
// //       callBack : function( data ){
// //          var authorData = {
// //             author: 	authorList[ data.countExec ],
// //             defered	: defered,
// //             authorList: authorList,
// //             authorRecursionCount: authorRecursionCount,
// //          };
// //          console.log( '\n------------------------\n' );
// //          console.log( authorData.author + 'の処理を開始' );
// //          Q.when( authorData )
// //          .then( fetchPageCounts )
// //          .then( fetchBookList )
// //          .then( modifyBookList )
// //          .then( saveBookList )
// //          .done( function( authorData ){
// //             console.log( authorData.author + '/' + authorData.bookList.length + '冊' + '著者毎の処理を完了' );
// //             console.log( '\n------------------------\n' );
// //
// //             data.countExec++;
// //             data.regularInterval( data );
// //
// //             if( data.countExec > authorData.authorList.length ){
// //                defered.resolve();
// //             }
// //
// //          });
// //       }
// //    };
// //    regInt( data );
// // })([ '小牧 成', '飯野 高' ]);
// //
// // // // // console.log( process.env.NODE_PATH );
// // // // console.log( process.env.NODE_PATH );
// // // // var process.env.NODE_PATH
// // // // var librarian = require('./librarian');
// // // // // librarian.inspectBookList();
// // // var testdata = require( 'test/librarian/lib/inspectBookList/testdata' );
// // // var fs 		= require('fs');
// // // // var file 	= fs.createWriteStream("test/librarian/lib/inspectBookList/testdata.js");
// // //
// // // // (function( arr ){
// // // // 	fs.readFile( 'test/librarian/lib/inspectBookList/testdata.js', 'utf8', function( err, data ){
// // // // 		if(err) throw err;
// // // // 		// data = data.toString();
// // // // 		// var arrayBuffer = new Uint8Array( data ).buffer;
// // // // 		// data = JSON.parse( data );
// // // // 		console.log( typeof modData );
// // // // 	});
// // // // })();
// // //
// // // var suc = 0;
// // // var err = 0;
// // // for (var i = 0; i < testdata.length; i++) {
// // //    var items = testdata[i].ItemLookupResponse.Items[0].Item[0].RelatedItems;
// // //    if( items ){
// // //       // console.log( items[0].RelatedItemCount[0] );
// // //       console.log( items[0].RelatedItem );
// // //       suc++;
// // //    }else{
// // //       err++;
// // //       // console.log( testdata[i].ItemLookupResponse.Items[0].Item[0] );
// // //    }
// // //    // if ( testdata[i].ItemLookupResponse ){
// // //    //    console.log( items );
// // //    //    // console.log( testdata[i].ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem );
// // //    // }else{
// // //    //    console.log( testdata[i].ItemLookupErrorResponse.Error[0].Message[0] );
// // //    // }
// // //    //  console.log( testdata[i].ItemLookupResponse );
// // // }
// // //
// // // console.log( testdata.length, 'length' );
// // // console.log( 'success', suc );
// // // console.log( 'error', err );
