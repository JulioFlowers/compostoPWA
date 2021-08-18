
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const app = express()

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

app.get('/',(req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

149 