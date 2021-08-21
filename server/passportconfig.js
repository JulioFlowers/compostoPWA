'use strict'

module.exports = (app, passport, session, passportLocal) => {

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


}