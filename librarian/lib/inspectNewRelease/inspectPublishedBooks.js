var Q = require('q');
var MakeOpConfig = require('common/makeOpConfig');
var opConfig = new MakeOpConfig();
var OperationHelper = require('apac').OperationHelper;
var promiseSerialize = require('common/promiseSerialize');
var logWrap = require('common/logWrap')('insepectNewRelease',true);
var interval = require('common/constant').interval;

module.exports = function (authors) {
    'use strict';

    var erroHandler = function (err) {
        logWrap.info(err);
    };

    var inspectToAmazon = function (author) {
        var def = Q.defer();
        var retryCount = 0;
        var inspectExpression = {
            SearchIndex: 'Books',
            BrowseNode: 465392,
            Condition: 'New',
            Author: author.name,
            ResponseGroup: 'Small'
        };

        var recursionInterval = function () {
            if (retryCount > 10) {
                // 10回以上トライしてもダメなら初期値に戻して次回に繰り延べ
                def.resolve();
            }
            var operationInspectAuthor = new OperationHelper(opConfig);
            operationInspectAuthor.execute('ItemSearch', inspectExpression, function (error, res) {
                if (error) {
                    erroHandler(res);
                }
                if (res.ItemSearchErrorResponse) {
                    // リクエスト失敗の時の処理
                    erroHandler(res);
                    retryCount += retryCount;
                    setTimeout(function () {
                        recursionInterval();
                    }, retryCount * interval);
                } else {
                  // リクエスト成功の時の処理
                    var publishedBooksCount;
                    try {
                        publishedBooksCount = res.ItemSearchResponse.Items[0].TotalResults[0];
                    } catch (e) {
                        publishedBooksCount = '';
                    } finally {
                        author.publishedBooksCount = publishedBooksCount;
                        def.resolve(author);
                    }
                }
            });
        };
        recursionInterval();
        return def.promise;
    };

    /*
    Handler本体
    */
    var d = Q.defer();
    promiseSerialize(authors, inspectToAmazon)
        .done(function (modAuthors) {
            d.resolve(modAuthors);
        });
    return d.promise;
};
