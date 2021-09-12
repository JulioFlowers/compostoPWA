const cmclient = require('./config/mqttconf')
const webpush = require('./config/webpush.js')
const mh = require('./messagehandler.js')

const sev = async () => {

    try {

        cmclient.publish('/prueba', 'Prueba de evento programado mqtt')
        mh.sender(1)

    } catch (error) { mh.sender(5)}
    
}

try {
        sev()

} catch (error) {mh.sender(2)}