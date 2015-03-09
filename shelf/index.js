var Q   = require( 'q' );
var fs  = require('fs');

var regInt          = require('./lib/regInt');
var fetchPageCounts = require('./lib/fetchPageCounts');
var fetchBookList   = require('./lib/fetchBookList');
var modifyBookList  = require('./lib/modifyBookList');
var saveBookList    = require('./lib/saveBookList');
var constant        = require('./lib/constant');

var Author = [ '森川ジョージ', '岩明均' ];

var data = {};
    data.times    = Author.length;
    data.interval = constant.interval;
    data.obj      = {};
    data.callBack = function( data ){
      var authorData = {
        author: Author[ data.countExec ]
      };
      console.log( Author[ data.countExec ], 'process has start.' );
      Q.when( authorData )
      .then( fetchPageCounts )
      .then( fetchBookList )
      .then( modifyBookList )
      .then( saveBookList )
      .done( function( authorData ){
        console.log( 'authorData', authorData.bookList.length );
        data.countExec++;
        data.regularInterval( data );
      });
    };

regInt( data );

var temp_readBookList = function( path ){
  fs.readFile( path, function( err, fileData ){
    var authorData  = JSON.parse( fileData );
      data = JSON.stringify( data );
    modifyBookList( authorData );
  });
};
