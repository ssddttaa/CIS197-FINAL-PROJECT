/**
 * Created by SadatShaik on 12/11/16.
 */
var express = require('express');
var request = require('request');
var mongo = require('../db/mongo');

var router = express.Router();

var getUsersReq;
var getUsersRes;
var nextError;

router.post('/regular', function(req, res, next){
  nextError = next;
  getUsersReq = req;
  getUsersRes = res;
  console.log("posted to regular");
  var collection = mongo["db"].collection('regular_users').find({
    email : req.body.email,
    password: req.body.password
  }, function(error, cursor){
    cursor.toArray(getUsersCallback);
  });
});

var getUsersCallback = function(error, response){
  if(response.length > 0){
    nextError("User already exists");
  } else {
    console.log("isnerting");
    mongo["db"].collection("regular_users").insert({
      email: getUsersReq.body.email,
      password: getUsersReq.body.password
    });
    getUsersReq.session.email = getUsersReq.body.email;
    getUsersReq.session.password = getUsersReq.body.password;
    getUsersReq.session.isAuthorized = true;
  }
  getUsersRes.redirect("/");
};

module.exports = router;