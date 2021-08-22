'use strict'

module.exports = (mqtt) => {

    var Opciones = {
        host: "34.102.107.56",
        port: 8083,
        protocol: "mqtt",
        clientId: "composto_monitor"+ ( Math.random() * 3.3)
      };
      var client = mqtt.connect(Opciones);

}