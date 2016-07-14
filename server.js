var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

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
app.use(morgan('dev')); //object of morgan

app.get('/',function(req,res){
  var name = "Lovepreet";
  res.json("My name is " + name);
});

app.get('/catname',function(req,res){
  res.json('batman');
});

//this function is for starting the server
//3000 is the port no
//listen will work fine even without function(err)
app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running");
});
