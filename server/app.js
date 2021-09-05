'use strict'

//configuracion para notificaciones web push
const webpush = require('./config/webpush.js')

module.exports = (app, passport) => {

    let user
    let pushSubscripton

   app.post('/subs', async (req, res) => {
        pushSubscripton = req.body
        console.log(pushSubscripton)
        res.status(201).json();

        let suscrito = JSON.stringify(
            {
                title: 'Composto Monitor.',
                message: 'Las notificaciones se activaron satisfactoriamente.'
            }
        )

        try {

            await webpush.sendNotification(pushSubscripton, suscrito)
            console.log("notificacion enviada")
        } catch (error) {

            console.log(error)
            
        }
        
      })



    app.get('/login', (req, res) => {

        res.render('pages/login.ejs')
    })

    app.post('/login', (req,res,next)=>{
        user=req.body.username
        return next()
    }, passport.authenticate('local', {
        
        successRedirect: '/',
        failureRedirect: '/login'
    }))

    app.get('/', (req, res, next) => {

        if (req.isAuthenticated())
            return next()

        res.redirect('/login')

    }, (req, res) => {

        let data = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [[1, '4:05', '44', '2', '70', '1', '45', '2', '25', '3', '345', '12'], [], [], [], [], [], [], [], [], [], [], [], [], '04:10:34']]
        res.render('pages/index.ejs', { data, user });
    })


}