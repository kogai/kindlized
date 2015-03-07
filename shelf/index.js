var Q = require('q');

var regularInterval = require('./lib/regularInterval');

var handleRegularInterval = function(){
  var d = Q.defer();

  var data = {
    times            : 5,
    interval         : 300,
    searchExpression : {},
    callBack         : function( countExec, searchExpression ){
      console.log( 'executed', countExec, searchExpression );
    },
    d: d
  }
  regularInterval( data );

  return d.promise;
};

Q.when()
.then( handleRegularInterval )
.then( handleRegularInterval )
.done( function(){
  console.log( 'all is done.' );
});

// # 制限
// 1P毎に10冊
// 1リクエスト毎の検索結果は最大20P

// # ステップ
// 書籍の冊数を数える 1回
// 年度毎の書籍の冊数を出す

// 20P以上なら
  // リクエストが10P以内に納まるように検索条件を分割

  // 例:1950年~現在までの検索リクエスト
    // 書籍の冊数が60冊の著者の場合
    // 1950年 -> 20冊
    // 1951年 -> 20冊
    // 1952年 -> 20冊

  // 10P毎に分割してリクエスト
    // 1冊ずつリクエスト
    // regularInterval( data );

// 20P以下なら
  // 10P毎に分割してリクエスト
    // 1冊ずつリクエスト
    // regularInterval( data );
