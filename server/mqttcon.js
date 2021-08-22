'use strict'

module.exports = (mqtt) => {

// connection option
const options = {
  		clean: true, // retain session
      connectTimeout: 4000, // Timeout period
      // Authentication information
      clientId: 'compostomonitor' + String(Math.random()*2.5),
      username: 'emqx_test',
      password: 'emqx_test',
}

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = 'ws://34.102.107.56:8883/mqtt'
const client = mqtt.connect(connectUrl, options)

client.on('connect', (error) => {
    console.log('Servidor conectado exitosamente.')
})

client.on('reconnect', (error) => {
    console.log('reconnecting:', error)
})

client.on('error', (error) => {
    console.log('Connection failed:', error)
})

client.on('message', (topic, message) => {
  console.log('receive message：', topic, message.toString())
})


}