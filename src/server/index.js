const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const os = require('os');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(session({
  key: 'user_sid',
  secret: 'login-secret-key',
  httpOnly: false,
  secure: false,
  cookie: {
    secureProxy: false,
    httpOnly: false,
  }
}));

app.use((req, res, next) => {
  if (req.cookies && req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

app.get('/api/getUsername', (req, res) => res.send({
  username: os.userInfo().username
}));

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

app.post('/api/login', (req, res) => {
  if (req.body.email == 'a@a.com' && req.body.password == '123456') {
    res.send({
      status: 'success'
    })
  } else {
    res.send({
      status: 'failure'
    })
  }
});

app.post('/api/signup', (req, res) => {
  res.send({
    status: 'success'
  })
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));