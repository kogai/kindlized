import moment from 'moment-timezone';
import escape from 'escape-regexp';
import Q from 'q';

import Librarian from 'Librarian/Librarian';
import { PERIODICAL_DAY } from 'common/constant';
import log from 'common/log';

/**
@constructor
**/
function Series() {
  this.Collections = require('models/Series');
  this.BookList = require('models/Book');
  this.Librarian = new Librarian();
  this._defer = this.Librarian.defer;
  this.conditions = {
    lastModified: { '$lte': moment().subtract(PERIODICAL_DAY, 'days') },
  };
  this.series = [];
}

Series.prototype.fetch = function fetch(done) {
  const _self = this;
  this.Collections.find(this.conditions, (err, items)=> {
    if (err) {
      return done(err);
    }
    log.info(`${moment().format('YYYY-MM-DD hh:mm')}[${_self.constructor.name}]${items.length}個のデータ処理を開始`);
    _self.series = items;
    done(null, items);
  });
  return;
};

/**
SeriesコレクションからBookListコレクションを取得する
**/
Series.prototype.join = function join(seriesItems, done) {
  const conditions = {
    _id: {
      $in: seriesItems.map((seriesItem)=> {
        return seriesItem._id;
      }),
    },
  };

  this.BookList.find(conditions, (err, books)=> {
    if (err) {
      return done(err);
    }
    done(null, books);
  });
};


/**
seriesItemのアイテムを更新する
seriesKeywordでBookListを検索して、前回とlengthが違えば
新刊があると判定
@param { Object } seriesItem
@param { Function } done
**/
Series.prototype._inspect = function _inspect(seriesItem, done) {
  const _self = this;
  const query = new RegExp(escape(seriesItem.seriesKeyword));

  this.BookList.find({ title: query }, (err, books)=> {
    if (err) {
      return done(err);
    }
    const update = {
      lastModified: moment(),
      recentCount: seriesItem.currentCount,
      recentContains: seriesItem.currentContains,
      currentCount: books.length,
      currentContains: books.map((book)=> {
        return {
          _id: book._id,
          title: book.title,
          url: book.url[0],
        };
      }),
    };

    if (seriesItem.currentCount === books.length) {
      update.hasNewRelease = false;
      log.info(`新刊無し ${books.length}冊: ${seriesItem.seriesKeyword}`);
    } else {
      update.hasNewRelease = true;
      log.info('新刊有り ' + seriesItem.currentCount + '冊: ' + seriesItem.seriesKeyword);
    }

    const options = { new: true };
    _self.Collections.findOneAndUpdate({ seriesKeyword: seriesItem.seriesKeyword }, update, options, (err, newSeriesItem)=> {
      if (err) {
        return done(err);
      }
      done(null, newSeriesItem);
    });
  });
};


/**
**/
Series.prototype.inspectSeries = function inspectSeries(done) {
  const _self = this;
  if (this.series.length === 0) {
    done(null, 'inspectSeries required Series.series.');
  }

  Q.all(this.series.map((item)=> {
    const deffered = Q.defer();
    _self._inspect(item, (err, updatedItem)=> {
      if (err) {
        return deffered.reject(err);
      }
      deffered.resolve(updatedItem);
    });
    return deffered.promise;
  }))
  .then((series)=> {
    done(null, series);
  })
  .fail((err)=> {
    done(err);
  });
};


/**
() （）で囲まれた文字列を削除する
@param { String } title - 書籍のタイトルデータ
@return { String } 括弧で囲まれた文字列を削除した書籍のタイトルデータ
**/
Series.prototype._trimChar = function _trimChar(title) {
  let trimedStr;
  // 括弧で囲まれた文字列の削除
  trimedStr = title.replace(/(\(|\（)[\s\S]*?(\)|\）)/g, '');

  // 最後に空白があれば削除
  trimedStr = trimedStr.replace(/(\s+)$/, '');

  // 末尾に巻数を表す数字があれば削除
  trimedStr = trimedStr.replace(/(\d+)$/, '');

  // 再度末尾の空白を削除(巻数とタイトルの間)
  trimedStr = trimedStr.replace(/(\s+)$/, '');

  // 末尾に!！?？があれば削除
  trimedStr = trimedStr.replace(/([\!！|?？||\:：|;；]+)$/, '');

  return trimedStr;
};


/**
書籍シリーズの保存メソッド
**/
Series.prototype.saveSeries = function saveSeries(title, done) {
  var _self = this;
  title = this._trimChar(title);

  this.Collections.findOne({ seriesKeyword: title }, function(err, series) {
    if (err) {
      return done(err);
    }
    if (series) {
      return done(null, series);
    }

    var query = new RegExp(escape(title));

    _self.BookList.find({ title: query }, function(err, books) {
      if (err) {
        return done(err);
      }
      var contains = books.map(function(book) {
        return {
          _id: book._id,
          title: book.title,
          url: book.url[0]
        };
      });
      var newSeries = new _self.Collections({
        seriesKeyword: title,
        lastModified: moment(),
        recentCount: books.length,
        recentContains: contains,
        currentCount: books.length,
        currentContains: contains,
        hasNewRelease: false
      });

      newSeries.save(function(err) {
        if (err) {
          return done(err);
        }
        done(null, newSeries);
      });
    });
  });
};


Series.prototype.run = function run(done) {
  const _fetch = this._defer(this.fetch.bind(this));
  const _inspectSeries = this._defer(this.inspectSeries.bind(this));

  Q.when()
  .then(_fetch)
  .then(_inspectSeries)
  .then(()=> {
    return done();
  })
  .fail((err)=> {
    return done(err);
  });
};


Series.prototype.cron = function cron() {
  return this._defer(this.run.bind(this));
};


module.exports = (opts = {})=> {
  const seriesInstanse = new Series(opts);
  return seriesInstanse;
};
