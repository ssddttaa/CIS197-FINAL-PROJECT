var express = require('express');
var cookieSession = require('cookie-session');
var app = express();
var uuid = require('node-uuid');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var internshipRouter = require('./routes/internshipManagement');
var bodyParser = require('body-parser');
var redirect = require('./middlewares/redirect');
var checkCookie = require('./middlewares/checkAuthorizedCookie');

// Serve static pages
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};

app.use(cookieSession({
  name : 'InternshipTrackerSession',
  secret:generateCookieSecret()
}));

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', checkCookie, function (req, res) {
  console.log(req.session);
  if(req.session.isAuthorized){
    res.render('Internships');
  } else {
    res.render('index');
  }
});



console.log("using loginrouter");

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/internship', internshipRouter);


app.use('/auth/linkedin/callback', redirect);

module.exports = app;
