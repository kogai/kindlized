var log = require('common/log');

var regularInterval = function( data ){

  // 実行回数を初期化
  if( !data.countExec ) data.countExec = 0;

  // dataオブジェクトから変数を取り出し
  var times     = data.times;
  var interval  = data.interval;
  var callBack  = data.callBack;
  var countExec = data.countExec;
  var bookList  = data.bookList;

  setTimeout( function(){
    if( countExec <  times ){
      // 実行の実体
      try{
        data.regularInterval = regularInterval;
        callBack( data );
      }
      catch( err ){
        log.info(err);
      }
    }else{
      // times回実行されたら終了
      console.log( 'regularInterval is complete.');
      data.d.resolve( bookList );
    }
  }, interval );
};

module.exports = regularInterval;
