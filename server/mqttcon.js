'use strict'

module.exports = (mqtt) => {

    var Opciones = {
        host: "34.102.107.56",
        port: 8083,
        protocol: "mqtt",
        clientId: "composto_monitor" + (Math.random() * 3.3)
    };

    var client = mqtt.connect(Opciones)

    client.on('connect', function () {
        client.subscribe('presence', function (err) {
            if (!err) {
                client.publish('presence', 'Hello mqtt')
            }
        })
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        client.end()
    })

}