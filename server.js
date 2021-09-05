'use strict'

//variables de entorno
require('dotenv').config()
const path = require('path')

//comunicacion http
const express = require('express')

//auntentificacion
const passport = require('passport')

//inicia la app web
const app = express()

//configuraciones del app web
require('./server/config/expressconf.js')(express, app)

//configuracion del protocolo mqtt para conectar con el esp32
require('./server/config/mqttconf.js')

//manejo de datos estaticos y renderización de interfaz.
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

// configuración de inicio de sesión.
 require('./server/config/passportconf.js')(app, passport)

//redireccion de peticiones http a https (no funciona en localhost, se necesita añadir certificados ssl)

/*app.get('*', function (req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https')
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  else
    next()  //Continue to other routes if we're not redirecting 
})*/

require('./server/app.js')(app, passport)

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
