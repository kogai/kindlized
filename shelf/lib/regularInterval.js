// 実行前に現在の実行回数を定義
var countExec = 0;

var regularInterval = function( times, interval,  searchExpression, callBack ){
  setTimeout( function(){

    // 実行の実体
    try{
      callBack( countExec, searchExpression );
    }
    catch( err ){
      throw err;
    }

    countExec++;
    if( countExec <  times ){
      // times回実行されるまで再帰実行
      regularInterval( times, interval, searchExpression, callBack );
    }else{
      // times回実行されたら終了
      console.log( 'complete.');
    }
  }, interval );
};

module.exports = regularInterval;
