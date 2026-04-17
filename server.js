import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

let envFile = './.env.local';
dotenv.config({
  path: envFile,
});
const app = express();

const __dirname = import.meta.dirname;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// define app default route e.g. /portfolio
// eslint-disable-next-line no-undef
app.use(`/base-ui-components`, express.static(path.join(__dirname, '/styleguide')));
// expose assets path
app.use('base-ui-components/assets', express.static(path.join(__dirname, '/styleguide/assets')));
// expose base-ui-icons path
app.use('/base-ui-components/base-ui-icons.svg', express.static(path.join(__dirname, `/styleguide`)));

// start server
app.listen(5000, function() {
  console.log('Express server listening on port 5000');
});
