var Q = require('q');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelUser = require('models/User');

const LocalStrategyField = {
  usernameField: 'mail',
  passwordField: 'password',
};

function LocalStrategyCallBack(mail, password, done) {
  console.log(mail, password);
  function fetchUser(mail, password, done) {
    var d = Q.defer();
    modelUser.findOne({ mail: mail }, function(err, user) {
      if (err) {
        console.log('LocalStrategyCallBackのエラー', err);
        return done(err);
      }
      if (!user) {
        console.log('存在しないユーザーです');
        return done(null, false, { message: '存在しないユーザーです' });
      }
      d.resolve({
        password: password,
        user: user,
        done: done,
      });
    });
    return d.promise;
  }

  function comparePassword(data) {
    var password = data.password;
    var user = data.user;
    var done = data.done;

    user.comparePassword(password, user.password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done( null, user );
      }
      done( null, false, { message: 'パスワードが間違っています。' } );
    });
  }

  fetchUser(mail, password, done)
  .done(comparePassword);
}

passport.use(
  new LocalStrategy(LocalStrategyField, LocalStrategyCallBack)
);

module.exports = passport;
