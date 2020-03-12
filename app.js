var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

//declare required library for initializing with the server
var passport = require('passport');

//Declare a variable for Authentication, Category, and Post route.
var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/post');

var app = express();

//Initialize passport 
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Add API route to the endpoint URL
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);

module.exports = app;

//connection to the MongoDB server
mongoose.connect('mongodb://localhost/blog-cms', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
