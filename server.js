var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
//body-parser will take request from user or you and parses it to the form that is required by the server such as get or post
//body-parser cannot handle multi-part data like image or video uploads
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
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
app.engine('ejs',engine);
app.set('view engine','ejs'); // setting ejs as engine for our webpages

app.post('/create-user',function(req,res,next){
  var user = new User(); //create instance of 'User' object
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  // save user in the database
  user.save(function(err){
    if(err) return next(err);
    res.json('Succssfully created a new user');
  });
});

app.get('/',function(req,res){
  res.render('main/home');
});

app.get('/about',function(req,res){
  res.render('main/about');
});

//this function is for starting the server
//3000 is the port no
//listen will work fine even without function(err)
app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running on port 3000");
});
