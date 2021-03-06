const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const qr = require('qr-image');
const fs = require('fs');

const index = require('./routes/index');
const users = require('./routes/users');
const beheer = require('./routes/beheer');
const home = require('./routes/home');
const game1 = require('./routes/game1');
const game2 = require('./routes/game2');
const game3 = require('./routes/game3');
const globalHome = require('./routes/globalHome');
const walletAanmaken = require('./routes/walletAanmaken');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/beheer', beheer);
app.use('/home', home);
app.use('/game1', game1);
app.use('/game2', game2);
app.use('/game3', game3);
app.use('/walletAanmaken', walletAanmaken);
app.use('/globalHome', globalHome);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
