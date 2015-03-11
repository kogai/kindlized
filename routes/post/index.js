var express	 		= require('express');
var router	  		= express.Router();
var modelBookList 	= require( '../../shelf/lib/modelBookList' );

var opHelper				= require( 'apac' ).OperationHelper;
var makeOpConfig 			= require( '../../common/makeOpConfig' );
var makeExistenceExpression	= require( './lib/makeExistenceExpression' );

var opConfig 					= new makeOpConfig();
var opExistenceBook 			= new opHelper( opConfig );

router.post( '/', function( req, res ) {
	var newBook = req.body.newBook;
    var existenceAuthorExpression   = new makeExistenceExpression( newBook );

	modelBookList.findOne( { title: newBook }, function( err, book ){
		if( !book ){
			// amazonに著者が存在するか調べる
			// 存在したらmodelAuthorに保存
            opExistenceBook.execute( 'ItemLookup', existenceAuthorExpression,  function( err, item ){
				try{
                	console.log( 'item success', item.ItemLookupResponse.Items[0].Request[0] );
				}catch( e ){
                	console.log( 'item err', item.ItemLookupResponse );
				}

                if( item.ItemLookupResponse ){
        			// var newBook = new modelAuthor({
        			// });
                    //
        			// newBooks.save( function(err){
        			// 	if(err) console.log(err);
        			// 	console.log( book.title, 'regist is success' );
            			res.send({
            				'isAddedAuthor': true
            			});
        			// });

                }else{
        			res.send({
        				'isExistenceAuthor': true
        			});
                }
            });
		}else{
			// 登録済みの著者
			res.send({
				'isRegisterdAuthor': true
			});
		}
	});
});

module.exports = router;
