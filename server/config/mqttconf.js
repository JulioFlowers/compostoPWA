'use strict'
const mqtt = require('mqtt')

const options = {
  		clean: true, // retain session
      connectTimeout: 4000, // Timeout period
      // Authentication information
      clientId: 'compostomonitor'+String(Math.random()*3.3),
      keepalive: 60,
      clean: true,
      username: "compostoM",
      password: "greenmethane"
}

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = 'ws://34.102.107.56:8083/mqtt'
const cmclient = mqtt.connect(connectUrl, options)

cmclient.on('connect', (error) => {
    console.log('Servidor conectado exitosamente.')
})

cmclient.on('reconnect', (error) => {
    console.log('reconnecting:', error)
})

cmclient.on('error', (error) => {
    console.log('Connection failed:', error)
})



module.exports = cmclient