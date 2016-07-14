var express = require('express');
var app = express(); // object of express

//this function is for starting the server
//3000 is the port no
//listen will work fine even without function(err)
app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running");
});
