var Q         = require('q');
var moment    = require('moment-timezone');
var constant  = require( '../../../common/constant' );

module.exports = function( bookList ){
  var d = Q.defer();
  callBack = function( bookList ){
    var siftedBookList = [];
    for (var i = 0; i < bookList.length; i++) {
        
      var lastModifyTime  = bookList[i]._id.getTimestamp();
      var todayDate       = moment();
      var diffDay         = todayDate.diff( lastModifyTime, 'days' );

      var hasAuthorityASIN = (function( AuthorityASIN ){
          var authorityASINState = false;
          if( AuthorityASIN.length > 0 ) authorityASINState = true;
          return authorityASINState;
      })( bookList[i].AuthorityASIN );

      if( diffDay > constant.periodicalDay && hasAuthorityASIN ){
        siftedBookList.push( bookList[i] );
      }
    }
    console.log( 'siftedBookList has', siftedBookList.length, 'books.' );
    d.resolve( siftedBookList );
  };
  callBack( bookList );
  return d.promise;
};
