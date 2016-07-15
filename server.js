var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
//body-parser will take request from user or you and parses it to the form that is required by the server such as get or post
//body-parser cannot handle multi-part data like image or video uploads
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

//importing user file from models folder
var User = require('./models/user');

var app = express(); // object of express
//dbuser:dbpassword
mongoose.connect('mongodb://lovepreet:lovepreet@ds041561.mlab.com:41561/ecommerce',function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Connected to the database");
  }
});

//Middleware
app.use(express.static(__dirname+'/public'));
app.use(morgan('dev')); //object of morgan
app.use(bodyParser.json()); // now our express application can parse json data also
app.use(bodyParser.urlencoded({extended:true}));// now our express application can parse x-www-form-urlencoded data also
app.use(cookieParser());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"lovepreet@#!%"
}));
app.use(flash());
app.engine('ejs',engine);
app.set('view engine','ejs'); // setting ejs as engine for our webpages

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

//we can also write app.use('/batman',mainRoutes) but them the links would become 'batman/' and 'batman/about'


//this function is for starting the server
//3000 is the port no
//listen will work fine even without function(err)
app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running on port 3000");
});
