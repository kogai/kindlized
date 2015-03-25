var Q = require('q');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var handleLookUpAuthorityASIN = require('librarian/lib/fetchParentASIN/handleLookUpAuthorityASIN');
var updateBooks = require('librarian/lib/fetchParentASIN/updateBooks');

module.exports = function(){
  var defferd = Q.defer();
  Q.when()
  .then(fetchBookList)
  .then(handleLookUpAuthorityASIN)
  .then(updateBooks)
  .done(function(){
    defferd.resolve();
  });
  return defferd.promise;

// - [x] AuthorityASINを持たない/UNDEFINED || 最終更新日時が1日以上前の書籍リストを最大100件取得
// - [ ] 各書籍に対して直列処理で以下の処理を実行する
//   - [ ] ASINを検索条件としてAuthorityASINを持っているか調べて書籍毎に格納する
// - [ ] 各書籍のデータを並列処理でアップデートする
// - [x] librarianの親処理に対してPromiseをresolveする
};

/*
var constant = require('common/constant');
var regInt = require('librarian/lib/fetchParentASIN/regInt');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var inspectASIN = require('librarian/lib/fetchParentASIN/inspectASIN');
var log = require('common/log');

module.exports = function() {
	var d = Q.defer();
	Q.when()
		.then(fetchBookList)
		.then(function(bookList) {
			var d = Q.defer();
			var data = {
				times: bookList.length,
				interval: constant.interval,
				bookList: bookList,
				d: d,
				callBack: function(data) {
					inspectASIN(data);
				}
			};
			regInt(data);
			return d.promise;
		})
		.done(function(bookList) {
			log.info('fetchParentASINが完了');
			d.resolve();
		});
	return d.promise;
};
*/
