import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy } from 'passport-twitter';
import AuthBot from 'models/AuthBot';
import log from 'common/log';

const app = express();
const router = express.Router();
const sessinCredential = process.env.KINDLIZED_SESSION;

function AuthServer() {
  passport.serializeUser((user, done)=> {
    done(null, user);
  });
  passport.deserializeUser((obj, done)=> {
    done(null, obj);
  });

  passport.use(new Strategy({
    consumerKey: process.env.KINDLIZED_TW_CONSUMER_KEY,
    consumerSecret: process.env.KINDLIZED_TW_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/twitter/callback',
  },
  function authCallback(token, tokenSecret, profile, done) {
    AuthBot.findOne({ screen_name: profile.username}, (err, bot)=> {
      if (err) {
        return log.info(err);
      }
      if (bot) {
        return log.info('This bot is already existed.');
      }
      const newAuthBot = new AuthBot({
        screen_name: profile.username,
        user: profile._json,
        accessToken: token,
        accessTokenSecret: tokenSecret,
      });
      newAuthBot.save((saveError)=> {
        if (saveError) {
          return done(saveError);
        }
        log.info('新しいbot:' + profile.username + 'が登録された。');
        done(null, profile);
      });
    });
  }));

  this.app = app;

  this.app.use(bodyParser());
  this.app.use(cookieParser());
  this.app.use(session({
    secret: sessinCredential,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  }));

  this.app.use(passport.initialize());
  this.app.use(passport.session());

  router.get('/twitter', passport.authenticate('twitter'), (req, res)=> {
    res.send('twitter-ok');
  });

  router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/fail' }), (req, res)=> {
    res.redirect('/');
  });

  router.post('/twitter', (req, res)=> {
    res.send('post-ok');
  });

  this.app.use(router);

  return this;
}

AuthServer.prototype.listen = function listen(port, callback) {
  this.app.listen(port, callback);
};

module.exports = function factory() {
  return new AuthServer();
};
