var router = require('express').Router();
var User = require('../models/user'); // one dot for going out of router folder and one dot for refering to .models folder as usual

router.get('/signup',function(req,res,next){
  res.render('accounts/signup',{
    errors:req.flash('errors')  // here we are sending errors object for get request .. we will get it in signup page by using same object errors
  });
});

router.post('/signup',function(req,res,next){
  var user = new User;

  user.profile.name  = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  //findOne is a mongoose function which will find only one document from the database
  User.findOne({email:req.body.email},function(err,existingUser){
    if(existingUser){
      req.flash('errors','Account with that email already exists');
      return res.redirect('/signup');
    }else{
      user.save(function(err,user){
        if(err) return next(err);
        return res.redirect('/');
      });
    }
  });
});

module.exports = router;
