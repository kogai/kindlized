"use strict";
var log = require('common/log');

var inspectNotifiedBooks = require('postman/lib/inspectNotifiedBooks');
var inspectKindlizedBooks = require('postman/lib/inspectKindlizedBooks');
var insertMailTemplate = require('postman/lib/insertMailTemplate');
var sendKindlizedNotification = require('postman/lib/sendKindlizedNotification');
var modifyNotifiedStatus = require('postman/lib/modifyNotifiedStatus');

var Q = require('q');

module.exports = function(user) {
	var d = Q.defer();

	inspectNotifiedBooks(user)
		.then(inspectKindlizedBooks)
		.then(insertMailTemplate)
		.then(sendKindlizedNotification)
		.then(modifyNotifiedStatus)
		.done(function(user) {
			log.info(user._id + 'の処理が完了');
			d.resolve();
		});

	return d.promise;
};

/*

/user
4. 以上を全userモデルに対してcron処理する / 日

/postman
# 配信メールに追加する
1. inspectKindlizedBooks関数の後にreccomendBookListの{isNotified:false}リストを呼び出し
2. user.reccomendListに保存
3. user.reccomendList.lengthが1以上であればメールテンプレートに追加する
4. sendKindlizedNotificationの kindlizedList.length > 0 を reccomendList.length > 0 の or論理演算子で選定する
5. modifyNotifiedStatus

*/
