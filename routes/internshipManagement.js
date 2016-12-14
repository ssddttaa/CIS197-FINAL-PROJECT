/**
 * Created by SadatShaik on 12/13/16.
 */

/**
 * Created by SadatShaik on 12/11/16.
 */
var express = require('express');
var request = require('request');
var mongo = require('../db/mongo');

var router = express.Router();

var internshipRes;

router.post('/update', function(req, res, next){
  console.log("update happening");
  if(req.session && req.session.userID && req.session.oauthToken) {
    mongo["db"].collection('linkedin_users').update({"id" : req.session.userID}, {$set : {internships : req.body.internships}});
  } else if(req.session.email && req.session.password){
    mongo["db"].collection('regular_users').update({"email" : req.session.email, "password" : req.session.password}, {$set : {internships : req.body.internships}});
  }
  res.end();
});

router.get('/retrieve', function(req, res, next){
  internshipRes = res;
  if(req.session && req.session.userID && req.session.oauthToken) {
    console.log("user id:" + req.session.userID);
    mongo["db"].collection('linkedin_users').find({"id" : req.session.userID}, function(error, cursor){
      cursor.toArray(getInternshipsCallback);
    });
  } else if(req.session.email && req.session.password){
    mongo["db"].collection('regular_users').find({"email" : req.session.email, "password" : req.session.password}, function(error, cursor){
      cursor.toArray(getInternshipsCallback);
    });
  } else {
    res.end();
  }
});

var getInternshipsCallback = function(error, cursor){
  //Since there should only be one user;
  console.log("internships:");
  console.log(cursor[0]);
  console.log(cursor[0]["internships"]);
  if(cursor[0]["internships"]) {
    internshipRes.send(cursor[0]["internships"]["companies"]);
  } else {
    return([]);
  }
};

module.exports = router;