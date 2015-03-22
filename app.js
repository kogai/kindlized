var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var passport        = require('passport');

var routes          = require('./routes/index');
var search          = require('./routes/search');
var book            = require('./routes/book');
var reduce          = require('./routes/reduce');
var saveBook        = require('./routes/saveBook');
var account         = require('./routes/account');
// var detail          = require('./routes/detail');

var credential;
if( process.env.AWSAccessKeyId || process.env.CI ){
	//heroku用変数
    credential = {};
	credential.session = process.env.session;
}else{
	//サービスサーバー用変数
    credential  = require('./credential');
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use( logger('dev'));
app.use( express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));
app.use( cookieParser());
app.use( session({
    secret : credential.session,
    cookie : { maxAge : 30 * 24 * 60 * 60 * 1000 }
}));

app.use( passport.initialize() );
app.use( passport.session() );

app.use( '/', routes );
app.use( '/reduce', reduce );
app.use( '/search', search );
app.use( '/book', book );
app.use( '/save', saveBook );
app.use( '/account', account );
// app.use( '/detail', detail );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
