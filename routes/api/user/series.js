import moment from 'moment-timezone';
import UserModel from 'models/User';
import SeriesClass from 'Librarian/Series';
import log from 'common/log';
const Series = SeriesClass();

module.exports = (req, res)=> {
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
};
