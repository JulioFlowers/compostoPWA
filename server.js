'use strict'

const express = require('express')
const mqtt = require('mqtt')

const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passportLocal = require('passport-local').Strategy

var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

const app = express()
app.use('/static', express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(limiter);
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('elperroespacialescuchaañoñocantarflamenco'))

require('./server/passportconfig.js')(app, passport, session, passportLocal)
require('./server/mqttcon.js')(mqtt)

app.get('*', function (req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https')
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  else
    next()  //Continue to other routes if we're not redirecting 
})

require('./server/app.js')(app, passport)

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
