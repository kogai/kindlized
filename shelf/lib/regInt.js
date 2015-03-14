var regularInterval = function( data ){
   // 実行回数を初期化
   if( !data.countExec ) data.countExec = 0;

   // dataオブジェクトから変数を取り出し
   var times     = data.times;
   var interval  = data.interval;
   var obj       = data.obj;
   var callBack  = data.callBack;
   var countExec = data.countExec;

  setTimeout( function(){
    if( countExec <  times ){
      // 実行の実体
      try{
        data.regularInterval = regularInterval;
        callBack( data );
      }
      catch( err ){
        throw err;
      }
    }else{
      // times回実行されたら終了
      if( data.authorData ){
         data.d.resolve( data.authorData );
      }
      console.log( 'complete.');
    }
  }, interval );
};

module.exports = regularInterval;
