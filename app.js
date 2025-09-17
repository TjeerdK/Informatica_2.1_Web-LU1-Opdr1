require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var moviesRouter = require('./src/routes/movies');
var authRouter = require('./src/routes/auth');

var app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  );
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(session({
  secret:'your-secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 5 * 60 * 60 * 1000, // Session expiration time in milliseconds
  } // Set to true if using HTTPS
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.authenticated = req.session.authenticated;
  next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const errorMsg = err.message || 'Er is een fout opgetreden.';
  // If there is a referrer, redirect back with error message in session
  if (req.get('Referrer')) {
    req.session.error = errorMsg;
    return res.redirect('back');
  }
  // Otherwise, render the error page
  res.locals.message = errorMsg;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
