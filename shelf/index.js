var regInt = require('./lib/regInt');

var data = {};
    data.times    = 5;
    data.interval = 300;
    data.Obj      = {};
    data.callBack = function( countExec, Obj ){
      console.log( 'executed', countExec, Obj );
    };

regInt( data );


// # 制限
// 1P毎に10冊
// 1リクエスト毎の検索結果は最大20P

// # ステップ
// 書籍の冊数を数える 1回
// 年度毎の書籍の冊数を出す

// 10P以上なら
  // リクエストが10P以内に納まるように検索条件を分割

  // 例:1950年~現在までの検索リクエスト
    // 書籍の冊数が60冊の著者の場合
    // 1950年 -> 20冊
    // 1951年 -> 20冊
    // 1952年 -> 20冊

  // 10P毎に分割してリクエスト
    // 1冊ずつリクエスト
    // regularInterval( data );

// 10P以下なら
  // 10P毎に分割してリクエスト
    // 1冊ずつリクエスト
    // regularInterval( data );
