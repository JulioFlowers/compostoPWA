'use strict'
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const app = express()

const httpPort = process.env.PORT || 8080
const httpsPort = process.env.PORT || 8443

const key = fs.readFileSync('./certificates/composto.key');
const cert = fs.readFileSync('./certificates/composto.crt');


const server = https.createServer({key: key, cert: cert }, app);

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(httpPort, () => {
  console.log(`Express is working on port ${httpPort}`);
});

server.listen(httpsPort, () => {
  console.log(`Express is working on port ${httpsPort}`);
});