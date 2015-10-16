const Q = require('q');
const _ = require('underscore');
const moment = require('moment-timezone');

const MailToUser = require('Postman/lib/MailToUser');
const Librarian = require('Librarian/Librarian');
const log = require('common/log');


/**
@constructor
**/
function Postman() {
  this.conditions = {
    isVerified: true,
  };
  this.Mailer = require('common/Mailer')();
  this.Utils = require('common/Utils')();
  this.User = require('models/User');
  this.Series = require('models/Series');
  this.users = [];
  this.Librarian = new Librarian();
  this._defer = this.Librarian.defer;
}

Postman.prototype.fetch = function fetch(done) {
  const _self = this;
  this.User.find(this.conditions, (err, users)=> {
    if (err) {
      return done(err);
    }
    _self.users = users;
    done(null, users);
  });
};

Postman.prototype.sent = function sent(done) {
  Q.all(this.users.map(MailToUser.send))
  .then(()=> {
    return done();
  })
  .fail((err)=> {
    return done(null, err);
  });
};


/**
ユーザーの登録しているSeries配列の新刊を持っているSeriesコレクションを取得する
@param { Object } user - Userドキュメント
@param { FUnction } done
@return { Error | Array }
**/
Postman.prototype.fetchSeries = function fetchSeries(user, done) {
  const _self = this;
  const conditions = {
    $and: [
      {
        _id: {
          $in: user.seriesList.map((userSeriesItem)=> {
            return userSeriesItem._id;
          }),
        },
      },
      { hasNewRelease: true },
    ],
  };

  this.Series.find(conditions, (err, seriesItems)=> {
    if (err) {
      return done(err);
    }
    done(null, _self._filterSeries(user, seriesItems));
  });
};


/**
ユーザーが新刊を調べた日:2015-06-01 < 新刊が確認された日:2015-06-10
UserDocument.seriesList[*].lastModified < SeriesDocument.lastModified
@param { Object } user - Userドキュメント
@param { Array } seriesItems- Seriesコレクション
@return { Array }
**/
Postman.prototype._filterSeries = function _filterSeries(user, seriesItems) {
  const filteredSeriesItems = seriesItems.map((seriesItem)=> {
    const isBeforeNewRelease = moment(seriesItem.lastModified).isBefore(user.modifiedLog.seriesListAt);
    if (isBeforeNewRelease) {
      return seriesItem;
    }
  });
  return _.compact(filteredSeriesItems);
};


/**
Seriesコレクションから新刊のBookListドキュメントを抽出する
@param { Array } seriesItems - Seriesコレクション
@param { FUnction } done
@return { Error | Array } 新刊のBookListコレクション
**/
Postman.prototype.inspectSeries = function inspectSeries(seriesItems, done) {
  let index;
  let seriesItem;
  let newReleasies = [];
  for (index = 0; index < seriesItems.length; index++) {
    seriesItem = seriesItems[index];
    newReleasies = this._diffItems(seriesItem.recentContains, seriesItem.currentContains);
  }

  if (newReleasies.length === 0) {
    return done({
      'status': 'not-sent',
      'message': '通知するシリーズ書籍がありません',
    });
  }
  done(null, newReleasies);
};


Postman.prototype._diffItems = function _diffItems(srcArray, criteriaArray) {
  const diffArray = _.filter(srcArray, (obj)=> {
    return !_.findWhere(criteriaArray, obj);
  });
  return diffArray;
};


Postman.prototype.run = function run() {
  const _fetch = this._defer(this.fetch.bind(this));
  const _sent = this._defer(this.sent.bind(this));

  Q.when()
  .then(_fetch)
  .then(_sent)
  .then(()=> {
    log.info('全メールの配信が完了');
  })
  .fail((err)=> {
    log.info(err);
  });
};

Postman.prototype.sentSeries = function sentSeries(user) {
  let args = Array.prototype.slice.call(arguments);
  args = _.compact(args);

  const done = args[args.length - 1];
  const _Mailer = this.Mailer;

  const _fetchSeries = this.Utils.defer(this.fetchSeries.bind(this));
  const _inspectSeries = this.Utils.defer(this.inspectSeries.bind(this));

  const _createTemplate = this.Utils.defer((series, callback)=> {
    _Mailer.createTemplate('series', series, (err, mailStrings)=> {
      if (err) {
        return callback(err);
      }
      _Mailer.setMail('info@kindlized.it', user.mail, '[kindlize.it] 新刊通知', mailStrings);
      callback();
    });
  });

  const _sendMail = this.Utils.defer(_Mailer.send.bind(_Mailer));
  Q.when(user)
  .then(_fetchSeries)
  .then(_inspectSeries)
  .then(_createTemplate)
  .then(_sendMail)
  .then((info)=> {
    return done(null, info);
  })
  .fail((err)=> {
    return done(null, err);
  });
};


Postman.prototype.runSeries = function runSeries() {
  const _fetch = this._defer(this.fetch.bind(this));
  const _sentSeries = this.Utils.defer(this.sentSeries.bind(this));
  const _sentAllUsers = this.Utils.defer((users, done)=> {
    Q.all(users.map(_sentSeries))
    .then((sendStatus)=> {
      return done(null, sendStatus);
    })
    .fail((err)=> {
      return done(err);
    });
  });

  Q.when()
  .then(_fetch)
  .then(_sentAllUsers)
  .then((sendStatus)=> {
    return log.info(sendStatus);
  })
  .fail((err)=> {
    return log.info(err);
  });
};


module.exports = function create() {
  return new Postman();
};
