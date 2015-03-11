var Q 			= require( 'q' );
var express 	= require('express');
var router 		= express.Router();
var modelAuthor = require( '../author/lib/modelAuthor' );

var fetchAuthorList = function(){
	var d = Q.defer();
	var authorList 	= modelAuthor.find( {}, function( err, authors ){
		d.resolve( authors );
	});
	return d.promise;
};

var renderRouter = function( authors ){
	var d = Q.defer();
	/* GET home page. */
	router.get('/', function(req, res) {
		res.render('index', {
			title : 'home',
			authors: authors
		});
		d.resolve();
	});
	return d.promise;
}

Q.when()
.then( fetchAuthorList )
.then( renderRouter )
.done( function(){
	console.log( 'router complete.' );
});

module.exports = router;
