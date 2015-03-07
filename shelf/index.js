var Q = require( 'q' );

var regInt          = require('./lib/regInt');
var fetchPageCounts = require('./lib/fetchPageCounts');
var fetchBookList   = require('./lib/fetchBookList');

var Author = [ '森川ジョージ', '岩明均' ];

var data = {};
    data.times    = Author.length;
    data.interval = 300;
    data.obj      = {};
    data.callBack = function( data ){
      var authorData = {
        author: Author[ data.countExec ]
      }
      Q.when( authorData )
      .then( fetchPageCounts )
      .then( fetchBookList )
      .done( function( authorData ){
        console.log( authorData.author , 'write', authorData.pageCount, 'pages books.' );
        console.log( authorData.bookList.length );

        // Author.length の回数分実行されるまで再帰実行
        data.countExec++;
        data.regularInterval( data );
      });
    };

regInt( data );


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
  // 1リクエストが10P以下になるよう2分割してリクエスト
    // 1冊ずつリクエスト
    // regularInterval( data );
