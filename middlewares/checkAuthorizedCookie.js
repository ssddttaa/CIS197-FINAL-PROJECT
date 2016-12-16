/**
 * Created by SadatShaik on 12/12/16.
 */

var mongo = require('../db/mongo');

var checkReq;
var checkNext;

var checkUserToken = function (req, res, next) {
  console.log('checking token');
  checkReq = req;
  if (req.session && req.session.userID && req.session.oauthToken) {
    console.log('checking oauth');
    mongo['db'].collection('linkedin_users').find({
      id: '' + req.session.userID,
      auth_token: '' + req.session.oauthToken
    }, function (error, results) {
      results.toArray(checkUserTokenCallback);
      checkNext = next;
    });
  } else if (req.session.email && req.session.password) {
    console.log('checking through email and pass');
    mongo['db'].collection('regular_users').find({
      email: '' + req.session.email,
      password: '' + req.session.password
    }, function (error, results) {
      results.toArray(checkUserTokenCallback);
      checkNext = next;
    });
  } else {
    console.log('nah just false');
    req.session.isAuthorized = false;
    next();
  }
};

var checkUserTokenCallback = function (error, results) {
  var hadElement = false;
  if (results.length >= 1) {
    hadElement = true;
  }
  if (hadElement) {
    checkReq.session.isAuthorized = true;
  } else {
    checkReq.session.isAuthorized = false;
  }
  console.log(checkReq.session.isAuthorized);
  checkNext();
};

module.exports = checkUserToken;