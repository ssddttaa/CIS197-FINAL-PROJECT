var request = require('request');
var mongo = require('../db/mongo');
var Client = require('node-rest-client').Client;

var client = new Client();

var access_token;
var redirectReq;
var redirectRes;
var globalData;

var redirect = function (req, res, next) {
  console.log("redirecting");
  request('http://localhost:3000/constants/constants.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var api_key = JSON.parse(body)["api_key"];
      var client_secret = JSON.parse(body)["client_secret"];

      var args = {
        headers: {
          "Host"        : "www.linkedin.com",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      redirectReq = req;
      redirectRes = res;
      client.post('https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code='+req.query.code+'&redirect_uri=http://localhost:3000/auth/linkedin/callback&client_id='+api_key+'&client_secret='+client_secret, args, getUserID);
    } else {
      next(error);
    }
  });
};

var getUserID = function(data, response){
  if(response.statusCode == 200){
    var args = {
      headers: {
        Host: "api.linkedin.com",
        Connection: "Keep-Alive",
        Authorization: "Bearer " + data['access_token'],
      }
    };

    access_token = data['access_token'];

    client.get('https://api.linkedin.com/v1/people/~?format=json', args, storeUserIDInDataBase);
  } else {
    redirectRes.redirect("http://localhost:3000")
  }
};




var parseResults = function(error, results){
  var hadElement = false;
  if(results.length >=  1){
    hadElement = true;
  }
  var collection = mongo["db"].collection('linkedin_users');

  for(var i = 0 ; i < results.length ; i++){
    hadElement = true;
    collection.update(
        { id : globalData["id"]},
        {
          $set : { auth_token : access_token}
        },
        {upsert : true}
    );
  }
  //
  if(!hadElement){
    collection.insert({
      id: globalData["id"],
      firstName: globalData["firstName"],
      lastName: globalData["lastName"],
      auth_token: access_token
    });
  }
  redirectReq.session.userID = globalData["id"];
  redirectReq.session.oauthToken = access_token;
  redirectRes.redirect('http://localhost:3000');
};



var storeUserIDInDataBase = function(data, response){
  var collection = mongo["db"].collection('linkedin_users');
  globalData = data;
  collection.find({id: data["id"]}, function(err, cursor){
    cursor.toArray(parseResults);
  });
};





module.exports = redirect;