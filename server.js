'use strict'
const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passportLocal = require('passport-local').Strategy
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.set('view engine', 'ejs');

app.use(helmet());
app.use(limiter);
server.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('elperroespacialescuchaañoñocantarflamenco'))

app.use(session({

  secret: 'elperroespacialescuchaañoñocantarlasleyesdeGauß',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal((username, password,done)=>{

  if(username=="researcher" && password=="nitrobacter")
     return done(null, {id: 1, name: "Perfil Researcher"})

  else if(username=="guest" && password=="composta")
     return done(null, {id: 2, name: "Perfil Invitado"})

  done(null,false)

}))

passport.serializeUser((user,done)=>{

  done(null, user.id);
})

passport.deserializeUser((id,done)=>{
  if (id==1)
     done(null, {id: 1, name: "Perfil Researcher"} )

  else if(id==2)
     done(null, {id: 2, name: "Perfil Invitado"})

})

 app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
  return res.redirect(['https://', req.get('Host'), req.url].join(''));
  else
    next()  //Continue to other routes if we're not redirecting 
})

require('./app.js')(app, passport)

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
