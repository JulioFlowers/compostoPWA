'use strict'
//configuracion para notificaciones web push
require('dotenv').config()
const webpush = require('./config/webpush.js')
const fs = require('fs');
const message = JSON.parse(fs.readFileSync('./server/config/messages.json'))

let pushSubscripton

const subscriber = async (req, res) => {

    let data = JSON.parse(fs.readFileSync('./server/config/pushsubs.json'))

    pushSubscripton = req.body;
    console.log(pushSubscripton);
    data.push(pushSubscripton);
    fs.writeFile('./server/config/pushsubs.json', JSON.stringify(data, null, 2), (err) => { if (err) return console.log(err) })

    // Server's Response
    res.status(201).json();

    try {
        await webpush.sendNotification(pushSubscripton, JSON.stringify(message[0]))
    } catch (error) {

        console.log(error)

    }
}

const sender = async (n) => {

    const subs = JSON.parse(fs.readFileSync('./server/config/pushsubs.json'))

    for (const element of subs) {
        let psub = element

        try {
            await webpush.sendNotification(psub, JSON.stringify(message[n])) // genera una excepción
        }
        catch (e) {
            // sentencias para manejar cualquier excepción
            console.log(e); // pasa el objeto de la excepción al manejador de errores
        }


    }
}


module.exports = { subscriber, sender }