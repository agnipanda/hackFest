var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var logsign = require('./routes/logsign');
var Schema = mongoose.Schema;
var app = express();
mongoose.connect('mongodb://localhost/sdata');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/logsign', logsign);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var studSchema = new Schema({
	name: {type : String , required : true},
	email: {type : String , required : true},
	phone: {type : String , required : true},
	roomid: {type : String , required : true},
	pasword: {type : String , required : true},
});
var studModel = mongoose.model('studModel',studSchema);

app.post('/logsign', function(req, res){
   var studInfo=req.body; //Get the parsed information
   
   if(!studInfo.name || !studInfo.email || !studInfo.phone || !studInfo.roomid || !studInfo.password){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newStud=new studModel({
		name:studInfo.name,
		email:studInfo.email,
		phone:studInfo.phone,
		roomid:studInfo.roomid,
		password:studInfo.password
		});
      newStud.save(function(err, studModel){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New student added", type: "logsign", studModel: studInfo});
      });
   };
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
