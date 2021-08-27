'use strict'

module.exports = (app, passport) => {

    let user

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
        res.render('index.ejs', { data, user });
    })


}