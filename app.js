var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
var config = require('./config');
var bot = require('./bot/bot');



//all routers
var usersRouter = require('./routes/users');
var artefactRouter = require('./routes/artefact');
var foodRouter = require('./routes/food');
var exchangeRouter = require('./routes/exchange');


//mongodb connect
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static( 'client/build' ));
  
  app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
  });
}

//all routers for using
app.use('/users', usersRouter);
app.use('/artefact', artefactRouter);
app.use('/food',foodRouter);
app.use('/exchange',exchangeRouter);

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
