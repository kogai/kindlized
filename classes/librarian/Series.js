import moment from 'moment';
import escape from 'escape-regexp';

import SeriesModel from 'models/Series';
import BookModel from 'models/Book';

/**
括弧で囲まれた文字列を削除する
@param { String } title - 書籍のタイトルデータ
@return { String } 括弧で囲まれた文字列を削除した書籍のタイトルデータ
**/
function trimChar(rawStr) {
  let trimedStr;
  // 括弧で囲まれた文字列の削除
  trimedStr = rawStr.replace(/(\(|\（)[\s\S]*?(\)|\）)/g, '');

  // 最後に空白があれば削除
  trimedStr = trimedStr.replace(/(\s+)$/, '');

  // 末尾に巻数を表す数字があれば削除
  trimedStr = trimedStr.replace(/(\d+)$/, '');

  // 再度末尾の空白を削除(巻数とタイトルの間)
  trimedStr = trimedStr.replace(/(\s+)$/, '');

  // 末尾に!！?？があれば削除
  trimedStr = trimedStr.replace(/([\!！|?？||\:：|;；]+)$/, '');

  return trimedStr;
}

/**
新しい書籍シリーズを保存する
@param { Object } conditions 書籍シリーズが含む書籍リストの検索クエリ
@param { Function } done
**/
function saveNewSeries(conditions, done) {
  BookModel.find(conditions, (err, books)=> {
    if (err) {
      return done(err);
    }
    const containsBooks = books.map((book)=> {
      return {
        _id: book._id,
        title: book.title,
        url: book.url[0],
      };
    });
    const newSeries = new SeriesModel({
      seriesKeyword: conditions.title,
      lastModified: moment(),
      recentCount: books.length,
      recentContains: containsBooks,
      currentCount: books.length,
      currentContains: containsBooks,
      hasNewRelease: false,
    });

    newSeries.save((saveError)=> {
      if (saveError) {
        return done(saveError);
      }
      done(null, newSeries);
    });
  });
}

class Series {
  /**
  書籍シリーズの保存
  @params { String } rawTitle
  @params { Function } done
  **/
  save(rawTitle, done) {
    const trimedTitle = trimChar(rawTitle);
    const conditions = {
      seriesKeyword: trimedTitle,
    };
    SeriesModel.findOne(conditions, (err, series)=> {
      if (err) {
        return done(err);
      }
      if (series) {
        done(null, series);
      }
      const query = new RegExp(escape(trimedTitle));
      saveNewSeries({
        title: query,
      }, done);
    });
  }
}

export default Series;
