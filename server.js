const express = require('express');
const bodyParser = require('body-parser');
const filterData = require('./data.js').FILTER_DATA;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/fetchFilters', (req, res) => {
  res.send(filterData);
});

app.listen(9900, () => console.log('App listening on port 9900!'));
