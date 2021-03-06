const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { sequelize } = require("./models");
const env = require('dotenv').config()

const indexRouter = require('./routes/index');
const legalCheckRouter = require('./routes/legalCheck');

const app = express();

// json/ utf-8 관련한 에러가 나오면.. 한번 주석풀고 테스트해보자.
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (env.NODE_ENV === 'production') {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: false,
    })
  );
  app.use(hpp());
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/legalCheck', legalCheckRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('------ SQL Restructure Complete ------');
  })
  .catch((error) => {
    console.log(error);
  });

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
