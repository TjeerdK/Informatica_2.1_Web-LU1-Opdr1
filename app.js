require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cros = require('cors');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var moviesRouter = require('./src/routes/movies');
var authRouter = require('./src/routes/auth');
const { error } = require('console');

var app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  );
  next();
});

app.use(cros());



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
    maxAge: 100 * 60 * 60 * 1000, // Session expiration time in milliseconds
  } // Set to true if using HTTPS
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.authenticated = req.session.authenticated;
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.authenticated = req.session.authenticated;

  // Flash messages voor errors en successen
  res.locals.error = req.session.error;
  res.locals.success = req.session.success;

  // Form data voor repopulating forms after errors
  res.locals.formData = req.session.formData;

  // Clear flash messages en form data na gebruik
  delete req.session.error;
  delete req.session.success;
  delete req.session.formData;

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
  if (err.name === 'AssertionError' && err.message) {
    errorMessage = err.message;
  }
  console.log(err.message);

  // if (req.get('Referrer')) {
  //   req.session.error = errorMsg;
  //   return res.redirect('back');
  // }
  // Otherwise, render the error page
  req.session.error = errorMsg;
  res.locals.message = errorMsg;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (req.body && Object.keys(req.body).length > 0) {
    req.session.formData = req.body;
  }
  res.status(err.status || 500);
  // res.render('error');

  //   // Redirect back to previous page or home
  const referer = req.get('Referer') || '/';
  // console.log("Was here");
  res.redirect(referer);
});


// error handler
// app.use(function(err, req, res, next) {
//   // Handle Chai validation errors with better messages
//   let errorMessage = err.message || 'An error occurred';
  
//   // If it's a Chai AssertionError, use the message directly
//   if (err.name === 'AssertionError' && err.message) {
//     errorMessage = err.message;
//   }
  
//   // Store error and form data in session for flash message
//   req.session.error = errorMessage;
  
//   // Save form data if it exists (for forms)
//   if (req.body && Object.keys(req.body).length > 0) {
//     req.session.formData = req.body;
//   }
  
//   // Redirect back to previous page or home
//   const referer = req.get('Referer') || '/';
//   res.redirect(referer);
// });
module.exports = app;
