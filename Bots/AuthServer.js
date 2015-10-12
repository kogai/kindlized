"use strict";

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var sessinCredential = require('common/makeCredential')('session');
var twitterCredential = require('common/makeCredential')('twitter');
var AuthBot = require('models/AuthBot');
var log = require('common/log');

function AuthServer(){

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new TwitterStrategy({
      consumerKey: twitterCredential.consumerKey,
      consumerSecret: twitterCredential.consumerSecret,
      callbackURL: "http://localhost:3000/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      log.info(profile);
      AuthBot.findOne({ screen_name: profile.username}, function(err, bot){
        if(err){
          return log.info(err);
        }
        if(bot){
          return log.info("This bot is already existed.");
        }
        var newAuthBot = new AuthBot({
          screen_name: profile.username,
          user: profile._json,
          accessToken: token,
          accessTokenSecret: tokenSecret
        });
        newAuthBot.save(function(err){
          if(err){
            return done(err);
          }
          log.info('新しいbot:' + profile.username + 'が登録された。');
          done(null, profile);
        });
      });
    }
  ));

  this.app = app;

  this.app.use(bodyParser());
  this.app.use(cookieParser());
  this.app.use(session({
    secret: sessinCredential,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  }));

  this.app.use(passport.initialize());
  this.app.use(passport.session());

  router.get('/twitter', passport.authenticate('twitter'), function(req, res){
    res.send('twitter-ok');
  });

  router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/fail' }), function(req, res){
    res.redirect('/');
  });

  router.post('/twitter', function(req, res){
    res.send('post-ok');
  });

  this.app.use(router);

  return this;
}

AuthServer.prototype.listen = function(port, callback){
  this.app.listen(port, callback);
};

module.exports = function(){
  return new AuthServer();
};
