'use strict'

//autenticación y manejo de sesión.
const passportLocal = require('passport-local').Strategy
const session = require('express-session')

module.exports = (app, passport) => {

    app.use(session({

        secret: process.env.COMPOSTO_SECRETO2,
        resave: true,
        saveUninitialized: true
      }))
      
      app.use(passport.initialize());
      app.use(passport.session());

    passport.use(new passportLocal((username, password,done)=>{

        if(username== process.env.RUSER && password== process.env.RCREDENTIAL)
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


}