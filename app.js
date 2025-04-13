var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
let { CreateSuccessResponse, CreateErrorResponse } = require('./utils/responseHandler')
let constants = require("./utils/constants")
let cors = require('cors')

var app = express();

app.use(cors({
  origin:'*'
}))

require('dotenv').config();
require('./config/db');

app.get('/', (req, res) => {
	res.send('Hello, MagazineNodeJs!');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(constants.SECRET_KEY_COOKIE));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/role', require('./routes/roleRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/pin', require('./routes/pinRoutes'));
app.use('/reaction', require('./routes/reactionRoutes'));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/auth', require('./routes/auth'));



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
  CreateErrorResponse(res, err.status||500, err.message)
});


//

module.exports = app;
