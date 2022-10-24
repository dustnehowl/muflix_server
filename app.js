var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const session = require("express-session");
const fileStore = require('session-file-store')(session);
var app = express();

// view engine setup
app.use(cors({
  origin: 'http://localhost:3000',
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

app.use(cookieParser());
// app.use(
//   session({
//   secret: '1@%24^%$3^*&98&^%$',
//   saveUninitialized: true,
//   resave: false,
//   store: new fileStore()
// }));

const tokenChecker = function (req, res, next) {
  console.log("토큰을 확인합니다.");
  //console.log(req);
  next();
};

app.use(tokenChecker);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/musics', musicsRouter);


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