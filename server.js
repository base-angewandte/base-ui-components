import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

let envFile = './.env.local';
dotenv.config({
  path: envFile,
});
const app = express();

// this is for node >= 20
// const __dirname = import.meta.dirname;
// for node 18
const __dirname = dirname(fileURLToPath(import.meta.url));

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
