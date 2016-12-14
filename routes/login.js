/**
 * Created by SadatShaik on 12/11/16.
 */
var express = require('express');
var request = require('request');
var mongo = require('../db/mongo');

var router = express.Router();

var regularRes;
var regularReq;
var nextError;

router.get('/linkedin', function(req, res, next){
  request('http://localhost:3000/constants/constants.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var api_key = JSON.parse(body)["api_key"];
      res.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+api_key+'&redirect_uri=http://localhost:3000/auth/linkedin/callback&state=987654321&scope=r_basicprofile');
    } else {
      next(error);
    }
  });
});

router.post('/regular', function(req, res, next){
  console.log("triggering regular");
  regularRes = res;
  regularReq = req;
  nextError = next;
  var collection = mongo["db"].collection('regular_users').find({
    email : req.body.email,
    password: req.body.password
  }, function(error, cursor){
    console.log("done getting stuff");
    cursor.toArray(getUsersCallback);
  });
});

var getUsersCallback = function(error, cursor){
  console.log("getting users callback");
  if(cursor.length == 0){
    console.log("incorrect");
    nextError("Incorrect login");
    regularReq.session.isAuthorized = false;
  } else {
    console.log("correct");
    regularReq.session.isAuthorized = true;
    regularReq.session.email = regularReq.body.email;
    regularReq.session.password = regularReq.body.password;
  }
  console.log(regularReq.session);
  regularRes.redirect('/');
};
module.exports = router;