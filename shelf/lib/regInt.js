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

    // 実行の実体
    try{
      callBack( countExec, obj );
    }
    catch( err ){
      throw err;
    }

    countExec++;
    if( countExec <  times ){
      // times回実行されるまで再帰実行
      data.countExec = countExec;
      regularInterval( data );
    }else{
      // times回実行されたら終了
      console.log( 'complete.');
    }
  }, interval );
};

module.exports = regularInterval;
