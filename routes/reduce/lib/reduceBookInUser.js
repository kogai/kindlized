var Q 				= require( 'q' );
var express 		= require('express');
var router 			= express.Router();
var modelUser       = require( 'user/lib/modelUser' );
var constant 		= require( 'common/constant' )

var fetchModelUser = function( req, res ){
	var d = Q.defer();
	modelUser.findOne( { _id: constant._id }, function( err, user ){
		d.resolve({
			user: user,
			req: req,
			res: res
		});
	});
	return d.promise;
};

var reduceBookListinUser = function( data ){
    var d = Q.defer();
    var bookId  = data.req.body.deleteBookId;
    var user    = data.user;
    var bookList = user.bookList;
    var reduceBookList = [];
    console.log( bookList.length );

    for (var i = 0; i < bookList.length; i++) {
        if( bookList[i].bookId !== bookId ){
            reduceBookList.push( bookList[ i ] );
        }
    }

    data.reduceBookList = reduceBookList;
    d.resolve( data );
	return d.promise;
};

var saveReducedBookInUser = function ( data ){
	var d = Q.defer();
    var reduceBookList = data.reduceBookList;
    modelUser.findOneAndUpdate( { _id: constant._id }, { bookList: reduceBookList}, function( err, modifiedUser ){
        data.modifiedUser = modifiedUser;
        d.resolve( data );
    });
	return d.promise;
};

var renderRouter = function( data ){
	var res    = data.res;
	var d      = Q.defer();
	res.send();
	d.resolve( data.reduceBookList );

	return d.promise;
}

module.exports = function( req, res ){
	fetchModelUser( req, res )
    .then( reduceBookListinUser )
    .then( saveReducedBookInUser )
	.then( renderRouter )
	.done( function( reduceBookList ){
		try{
			console.log( 'このユーザーは' + reduceBookList.length + '冊の書籍を登録している' );
		}catch( err ){
			console.log( 'このユーザーは書籍を登録していない');
		}
	});
};
