require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleAuthCodeStrategy = require('passport-google-authcode').Strategy;


const app = express();

passport.use(new GoogleAuthCodeStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {accessToken, refreshToken, profile};
    console.log(user);
    return done(null, user);
    
  }
));
app.use(require('body-parser').json());
app.use(passport.initialize());

app.post('/auth/google/authcode',
  passport.authenticate('google-authcode',{session:false}),
  function (req, res) {
    res.send(req.user? req.user : 401);
  }
);

server = app.listen(3000,'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});