import Promise from 'bluebird';
import UserModel from 'models/User';
import BookModel from 'models/Book';
import Mailer from 'common/Mailer';
import SeriesModel from 'models/Series';

function filterNewReleases(src, dist, props) {
  /* Series.currentContainsとSeries.recentContainsの差分配列を生成 */
  return dist.filter((item)=> {
    let isDiff = true;
    src.filter((distItem)=> {
      if (item[props].toString() === distItem[props].toString()) {
        isDiff = false;
      }
      return item[props].toString() !== distItem[props].toString();
    });
    return isDiff ? item : null;
  });
}

function createSeriesReleases(seriesList) {
  return seriesList.map((series)=> {
    return {
      id: series.id,
      newReleasesCount: series.currentCount - series.recentCount,
      newReleases: filterNewReleases(series.recentContains, series.currentContains, '_id'),
    };
  });
}

function createSeriesIDs(seriesList) {
  return seriesList.map(series => series.id);
}

function createNewBookIDs(newReleases) {
  const bookList = [];
  newReleases.forEach((item)=> {
    item.newReleases.forEach((book)=> {
      bookList.push(book._id);
    });
  });
  return bookList;
}

class PostSeries {
  constructor() {
    this.seriesReleases = [];
    this.seriesIDs = [];
  }

  getHasNewReleases(done) {
    const conditions = {
      hasNewRelease: true,
    };
    SeriesModel.find(conditions, (err, series)=> {
      if (err) {
        return done(err);
      }
      this.seriesReleases = createSeriesReleases(series);
      this.seriesIDs = createSeriesIDs(series);
      done(null);
    });
  }

  getNewBookIDs(user, done) {
    const seriesList = user.seriesList;
    const seriesReleases = this.seriesReleases;

    const notifyList = seriesReleases.filter((item)=> {
      let notifyItem;
      seriesList.forEach((series)=> {
        if (series._id.toString() === item.id.toString()) {
          notifyItem = item;
        }
      });
      return notifyItem;
    });
    done(null, createNewBookIDs(notifyList));
  }

  sendMail(user, books, done) {
    const mail = Mailer({ to: user.mail });
    mail.createTemplate('series', books, (err, templates)=> {
      if (err) {
        done(err);
      }
      const from = 'info@kindlized.it';
      const to = user.mail;
      const subject = '[kindlize.it] 新刊通知';
      mail.setMail(from, to, subject, templates);
      mail.send(done);
    });
  }

}

function postSeriesHandler(user) {
  return new Promise((resolve, reject)=> {
    const ps = new PostSeries();
    ps.getHasNewReleases((releaseError)=> {
      if (releaseError) {
        return reject(releaseError);
      }
      if (ps.seriesReleases.length === 0) {
        return resolve();
      }
      ps.getNewBookIDs(user, (ownError, notifyBookIDs)=> {
        if (ownError) {
          return reject(ownError);
        }
        if (notifyBookIDs.length === 0) {
          console.log(`${user.mail} には配信する新刊通知がない`);
          return resolve();
        }

        const conditions = {
          _id: {
            $in: notifyBookIDs,
          },
        };
        BookModel.find(conditions, (bookError, books)=> {
          if (bookError) {
            return reject(bookError);
          }
          ps.sendMail(user, books, (mailError)=> {
            if (mailError) {
              return reject(mailError);
            }
            console.log(`${user.mail} に${books.length}冊の新刊通知を配信した`);
          });
        });
      });
    });
  });
}

// クラスのエクスポート
export default PostSeries;
export function runPostSeries() {
  const conditions = {
    isVerified: true,
  };
  UserModel.find(conditions, (err, users)=> {
    Promise.all(users.map(user => postSeriesHandler(user)))
      .then()
      .catch(handlingError => console.log(handlingError));
  });
}
