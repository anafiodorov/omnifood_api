const express = require('express');
// const cors = require('cors');
const app = express();
const port = 3001;
const client_model = require('./client_model');
var https = require('https');

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use(express.json());
app.use(function (req, res, next) {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://omnifood-app.onrender.com',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  next();
});

app.get('/', (req, res) => {
  client_model
    .getClients()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post('/clients', (req, res) => {
  client_model
    .createClient(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete('/clients/:id', (req, res) => {
  client_model
    .deleteClient(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
setInterval(function () {
  https.get('https://omnifood-app.onrender.com/');
  https.get('https://omnifood-api.onrender.com/hello');
}, 1000 * 60 * 25); // every 25 minutes
