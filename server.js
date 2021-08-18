const express  = require('express');
const app      = express();
const path     = require('path');

const app = express()
app.use(express.static(path.resolve(__dirname, 'public')));



app.get('/',(req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});