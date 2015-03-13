var Q 		= require( 'q' );
var express = require('express');
var router 	= express.Router();

var isNewBook = require('routes/saveBook/lib/isNewBook');

// var modelAuthor 	= require( '../../author/lib/modelAuthor' );
// var modelBookList 	= require( '../../shelf/lib/modelBookList' );

// var fetchBookList = function(){
// 	var d = Q.defer();
// 	var bookList = modelBookList.find( {}, function( err, books ){
// 		d.resolve( books );
// 	});
// 	return d.promise;
// };
//
// var renderRouter = function( books ){
// 	var d = Q.defer();
// 	console.log( books.length );
// 	router.get('/', function(req, res) {
//         res.send( books );
// 		d.resolve( books );
// 	});
// 	return d.promise;
// }

// fetchBookList()
// .then( renderRouter )
// .done( function( books ){
// 	console.log( 'books router fetched ', books.length );
// });

router.post( '/', function( req, res ){
	var newBook	= req.body.newBook;
	isNewBook( newBook )
	.done( function(){
		res.send({
		   newBook: newBook
		});
	});
});

/*

- [x] postされた書籍情報をmongoDBと照合
新規書籍ならmodelBookListに保存
modelUserのbookListに保存
保存成功のステータスを返す
保存失敗のステータスを返す

*/

module.exports = router;
