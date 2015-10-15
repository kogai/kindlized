require('babel/register');

const log = require('common/log');

const TwitterBot = require('Bots/TwitterBot');
const AuthServer = require('Bots/AuthServer');
const Bots = {};

Bots.AuthServer = AuthServer();

Bots.AuthServer.listen(4000, ()=> {
  log.info('Authentication server start.');
});

Bots.TwitterBot = TwitterBot({
  consumer_key: process.env.KINDLIZED_TW_CONSUMER_KEY,
  consumer_secret: process.env.KINDLIZED_TW_CONSUMER_SECRET,
  screen_name: 'info_kindlize',
}, (err)=> {
  if (err) {
    return log.info(err);
  }
  Bots.TwitterBot.listen();
});
