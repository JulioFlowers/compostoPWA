const cmclient = require('./config/mqttconf')
const mh = require('./messagehandler.js')

const sev = async () => {

    try {

        cmclient.publish('/prueba', 'Prueba de evento programado mqtt')
        mh.sender(1)

    } catch (error) { 
        console.log('Oh no ha ocurrido un error')
        console.log(error)
        mh.sender(5)}
    
}

