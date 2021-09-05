'use strict'

module.exports = (app, passport, webpush) => {

    let user
    let pushSubscripton

    let suscrito = JSON.stringify(
        {
            title:"Composto Monitor.",
            message:"Las notificaciones se activaron satisfactoriamente."
        }
    )

   app.post("/subs", async (req, res) => {
        pushSubscripton = req.body
        console.log(pushSubscripton)

        res.status(201).json();
        await webpush.sendNotification(pushSubscripton, suscrito)
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