module.exports = function(){
   // *1日に一度実行する

   // 全てのuserモデルを取得
   // userモデルのリストから各userモデルへ以下の処理を実行
      // userモデルのbookListからisNotifiedがfalseのものを抽出してpostList配列に格納
      // postListをメールのテンプレートに挿入
      // メールを送信
   // 全ての処理を完了

   var fetchUserModel;
   var postMailToUser;
      var inspectNotifiedBooks;
      var insertMailTemplate;
      var sendKindlizedNotification;
};
