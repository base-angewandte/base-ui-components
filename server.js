const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const filterData = require('./data.js').FILTER_DATA;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
}

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/fetchFilters', cors(corsOptions), (req, res) => {
  console.log('sending');
  res.send(filterData);
});

app.get('/entities/:id', cors(corsOptions), (req, res) => {
  setTimeout(() => {
    console.log('now');
    res.sendStatus(200);
  }, 1000);
});

app.listen(9900, () => console.log('App listening on port 9900!'));
