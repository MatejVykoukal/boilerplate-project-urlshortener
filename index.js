require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function randomInt(minInt=0,maxInt=10) {
  return Math.floor(Math.random() * maxInt) + minInt;
}

let short_url
let original_url

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {

  
  if(!isValidHttpUrl(req.body.url)) res.json({ error: 'invalid url' })
  
  original_url = req.body.url
  short_url = randomInt()
  
  res.json({original_url, short_url});
});


app.get('/api/shorturl/:short_url', (req, res)=>{
  if(!short_url === +req.params.short_url) res.json({ error: 'invalid url' })
  
  res.redirect(original_url);  

})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
