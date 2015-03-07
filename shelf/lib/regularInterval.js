// 実行前に現在の実行回数を定義
var countExec = 0;

var regularInterval = function( times, interval,  searchExpression ){
  setTimeout( function(){

    // 実行の実体
    console.log( countExec );

    countExec++;
    if( countExec <  times ){
      // times回実行されるまで再帰実行
      regularInterval( times, interval, searchExpression );
    }else{
      // times回実行されたら終了
      console.log( 'complete.');
    }
  }, interval );
};

module.exports = regularInterval;
