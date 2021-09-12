const cmclient = require('./config/mqttconf')
const mh = require('./messagehandler.js')

const sev = () => {

    try {

        cmclient.publish('/prueba', 'Prueba de evento programado mqtt')
        mh.sender(1)

    } catch (error) { 
        console.log(error)
        mh.sender(5)}
    
}

try {
        sev()

} catch (error) {
    console.log(error)
    mh.sender(2)}