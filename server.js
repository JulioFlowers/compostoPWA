'use strict'
const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passportLocal = require('passport-local').Strategy
const app = express()

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'))
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

app.get('/',(req,res,next)=>{

  if (req.isAuthenticated()) 
    return next()

  res.redirect('/login')

},(req, res)=> {

    let data = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [[1,'4:05','44','2','70','1','45','2','25','3','345','12'],[],[],[],[],[],[],[],[],[],[],[],[],'04:10:34']] 
     res.render('index.ejs',{data});
})

app.get('/login', (req,res)=>{

  res.render('pages/login.ejs')
})

app.post('/login',passport.authenticate('local',{

  successRedirect: '/',
  failureRedirect: '/login'
}))

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
