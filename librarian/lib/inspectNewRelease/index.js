var Q = require('q');
var moment = require('moment-timezone');
var periodicalDay = require('common/constant').periodicalDay;
var promiseSerialize = require('common/promiseSerialize');
var modelAuthor = require('author/lib/modelAuthor');

var fetchAuthors = require('librarian/lib/inspectNewRelease/fetchAuthors');
var inspectPublishedBooks = require('librarian/lib/inspectNewRelease/inspectPublishedBooks');
var modifyAuthors = require('librarian/lib/inspectNewRelease/modifyAuthors');

module.exports = function(){
    "use strict";
/*
  /librarian
  ##著者に新刊があるか調べる
  以下を全authorモデルに対してcron処理する / 週
  1. 刊行数を調べる inspectPublishedBooks
  2. 前回cron実行時の刊行数を旧刊行数に保存する modifyAuthors
  3. 新しい刊行数を保存する modifyAuthors
  3. 新しい刊行数が旧刊行数と違えばisChangedをtrueに、それ以外はfalseに設定する modifyAuthors
  4. 刊行数の調査日時を記録する modifyAuthors
*/
  Q.when()
  .then(fetchAuthors)
  .then(inspectPublishedBooks)
  .then(modifyAuthors)
  .fail(handleFails)
  .done();

};

var handleFails = function(){
  var d = Q.defer();



  return d.promise;
};

/*

/routes/saveBook
##userモデルに新しく書籍が追加された時の処理
1. 登録された書籍のtitleからauthorモデルを取得
2. authorモデルの_idをユニークの基準にしてauthorListに追加する

/user
##推薦する書籍リストを作る
1. authorListの_idからwroteBooks配列の書籍リストを{isChanged:true}クエリで呼び出す
2. 呼び出された書籍リストのrecent-currentのpublicationBooks配列を比較して、currentの側にのみある_id要素を取得する
2. 呼び出し結果を_idをreccomendBookList対してユニークか検査する
3. フィルタリングされた_idリストをreccomendBookListにconcatして保存する
4. 以上を全userモデルに対してcron処理する / 日

/postman
# 配信メールに追加する
1. inspectKindlizedBooks関数の後にreccomendBookListの{isNotified:false}リストを呼び出し
2. user.reccomendListに保存
3. user.reccomendList.lengthが1以上であればメールテンプレートに追加する
4. sendKindlizedNotificationの kindlizedList.length > 0 を reccomendList.length > 0 の or論理演算子で選定する
5. modifyNotifiedStatus

*/
