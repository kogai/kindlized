import path from 'path';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import routes from 'routes/';
import account from 'routes/account';
import redis from 'connect-redis';

const RedisStore = redis(session);

const SESSION_CREDENTIAL = process.env.KINDLIZED_SESSION;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

app.use(session({
  store: new RedisStore({
    host: process.env.DOCKER_IP,
    port: 6379,
  }),
  secret: SESSION_CREDENTIAL,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/account', account);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res)=> {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res)=> {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
