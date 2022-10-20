var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const session = require("express-session");
const fileStore = require('session-file-store')(session);
var app = express();

// app.use(session({
//   httpOnly: true,
//   secret: 'secret key',
//   saveUninitialized: true,
//   resave: true,
//   cookie: {	
//     httpOnly: true,
//     maxAge: 600000
//   },
//   store: new fileStore()
// }));


// view engine setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// app.get('/', function(req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// });

app.use(cookieParser());
app.use(
  session({
  secret: '1@%24^%$3^*&98&^%$',
  saveUninitialized: true,
  resave: false,
  store: new fileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
