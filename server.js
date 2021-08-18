
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const app = express()

app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
  return res.redirect(['https://', req.get('Host'), req.url].join(''));
  else
    next() /* Continue to other routes if we're not redirecting */
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
