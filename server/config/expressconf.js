'use strict'

//seguridad
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

//manejo de peticiones
const cookieParser = require('cookie-parser')
const morgan= require('morgan')

module.exports = (express, app) => {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000 // limit each IP to 100 requests per windowMs
    });

    app.use(helmet());
    app.use(limiter);
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser(process.env.COMPOSTO_SECRETO1))

}