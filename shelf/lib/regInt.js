var regularInterval = function( data ){

  // 実行回数を初期化
  if( !data.countTimes ) data.countTimes = 0;
  if( !data.countDepth ) data.countDepth = 0;

  // dataオブジェクトから変数を取り出し
  var times      = data.times;
  var depth      = data.depth;
  var interval   = data.interval;
  var obj        = data.obj;
  var callBack   = data.callBack;
  var countTimes = data.countTimes;
  var countDepth = data.countDepth;

  setTimeout( function(){

    // 実行の実体
    try{
      callBack( countTimes, obj );
    }
    catch( err ){
      throw err;
    }

    countTimes++;
    if( countTimes <  times ){
      // times回実行されるまで再帰実行
      data.countTimes = countTimes;
      regularInterval( data );
    }else{
      // times回実行されたら子の再帰
      countDepth++;
      data.countDepth = countDepth;
      if( countDepth < depth ){
        data.countTimes = null;
        regularInterval( data );
      }else{
        console.log( 'all is done.' );
      }
    }
  }, interval );
};

module.exports = regularInterval;
