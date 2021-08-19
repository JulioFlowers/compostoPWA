'use strict'
const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
  return res.redirect(['https://', req.get('Host'), req.url].join(''));
  else
    next()  //Continue to other routes if we're not redirecting 
}) 

app.get('/',(req, res)=> {
     res.render('/index');
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
