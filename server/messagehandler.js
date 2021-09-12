'use strict'
//configuracion para notificaciones web push
const webpush = require('./config/webpush.js')
const fs = require('fs');
const { nextTick } = require('process');
const message = JSON.parse(fs.readFileSync('./server/config/messages.json'))

const subscriber = async (req, res) => {

    let pushSubscripton = req.body
    res.status(201).json();

    fs.readFile('./server/config/pushsubs.json', (err, data) => {
        if (err) throw err;
        let subs = JSON.parse(data);

        const managesubs = async ()=>{

            await subs.forEach(async (element) => {
    
                 if (await pushSubscripton.endpoint === element.endpoint) {
                }
                else{
                    subs.push(pushSubscripton)
                    let ppsubs = JSON.stringify(subs, null, 2)
        
                    fs.writeFile('./server/config/pushsubs.json', ppsubs, (err) => { if (err) throw err })
                }
            })
        }

        managesubs()
  
    })

    try {
        await webpush.sendNotification(pushSubscripton, JSON.stringify(message[0]))
    } catch (error) {

        console.log(error)

    }
}

const sender = async (n) => {

    const subs = JSON.parse(fs.readFileSync('./server/config/pushsubs.json'))

    await subs.forEach(async (element) => {
        let psub = element
        try {
            await webpush.sendNotification(psub, JSON.stringify(message[n]))
        } catch (error) {
    
            console.log(error)
    
        }
    })

}

module.exports = { subscriber, sender }