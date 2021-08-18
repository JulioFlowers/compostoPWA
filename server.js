const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const path     = require('path');

const app = express()
app.use(express.static(path.resolve(__dirname, 'public')));



app.get('/',(req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.listen(port);
console.log('Servidor iniciado en puerto ' + port);