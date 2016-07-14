var express = require('express');
var morgan = require('morgan');

var app = express(); // object of express

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
