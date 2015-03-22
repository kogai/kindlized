var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelBookList = require('shelf/lib/modelBookLIst');

router.get('/*/', function( req, res ) {
  console.log('req.url',req.url);
  var ASIN = req.url;
  ASIN = ASIN.substr(1);

  modelBookList.findOne( { ASIN: ASIN }, function(error, book){
    if(error){
      console.log('/detail/*/の書籍検索エラー', error);
      res.render('detail',{
        title:'書籍詳細ページ',
        error: error
      });
    }else{
      console.log('book',book);
      book.images = JSON.parse(book.images)[0].ImageSet[0].MediumImage[0].URL[0];
      var title = book.title + ':書籍詳細ページ';
      res.render('detail',{
        title: title,
        book: book
      });
    }
  });
});

module.exports = router;
