var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


const session = require("express-session");
const fileStore = require('session-file-store')(session);
const key = "yeonsu";
var app = express();

// view engine setup
app.use(cors({
  //'http://117.17.198.45:3000'
  origin: 'http://117.17.198.45:3002',
  credentials: true
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var musicsRouter = require('./routes/musics');
var commnentRouter = require('./routes/comments');

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/musics', musicsRouter);
app.use('/comments', commnentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;