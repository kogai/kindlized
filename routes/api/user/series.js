import moment from 'moment-timezone';
import Promise from 'bluebird';
import UserModel from 'models/User';
import SeriesClass from 'Librarian/Series';
import log from 'common/log';
const Series = SeriesClass();

export default {
  post(req, res) {
    const userSession = req.session.passport.user;
    if (!userSession) {
      return res.status(500).send();
    }
    const query = req.body.query;

    Series.saveSeries(query, (err, newSeries)=> {
      if (err) {
        log.info(err);
        return res.status(500).send(err);
      }
      const resMessage = `『${newSeries.seriesKeyword}』を登録しました。`;
      const existMessage = `『${newSeries.seriesKeyword}』は登録済みです。`;

      const conditions = {
        _id: userSession,
        'seriesList.seriesKeyword': {
          $nin: [ newSeries.seriesKeyword ],
        },
      };
      const update = {
        modifiedLog: {
          seriesListAt: moment(),
        },
        $push: {
          seriesList: {
            _id: newSeries._id,
            seriesKeyword: newSeries.seriesKeyword,
          },
        },
      };
      const option = { new: true };

      UserModel.findOneAndUpdate(conditions, update, option, (updateError, user)=> {
        if (updateError) {
          log.info(updateError);
          return res.status(500).send(updateError);
        }
        if (user) {
          res.send({
            message: resMessage,
          });
        } else {
          res.send({
            message: existMessage,
          });
        }
      });
    });
  },
  delete(req, res) {
    const userSession = req.session.passport.user;
    if (!userSession) {
      return res.status(500).send();
    }
    const seriesKeyword = req.body.query;
    const conditions = { _id: userSession };
    const findOne = Promise.promisify(UserModel.findOne.bind(UserModel));

    findOne(conditions)
    .then((user)=> {
      const update = {
        seriesList: user.seriesList.filter((series)=> {
          if (series.seriesKeyword !== seriesKeyword) {
            return series;
          }
        }),
      };
      return new Promise((resolve, reject)=> {
        UserModel.findOneAndUpdate(conditions, update, (updateError)=> {
          if (updateError) {
            return reject(updateError);
          }
          resolve();
        });
      });
    })
    .then(()=> {
      return res.status(200).send();
    })
    .catch((err)=> {
      return res.status(500).send(err);
    });
  },
};
