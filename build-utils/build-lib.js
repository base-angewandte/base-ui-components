/* eslint-disable no-console */
/* eslint-disable-next-line */
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const libConfig = require('../src/lib');

console.info('Lets build!');

// Update the index file
console.info('Updating index file');
require('./update-index-file');

// Get the names of all components in the src directory
const componentNames = require('./component-names');

// Get the binary for vue-cli-service
const vueCliServicePath = getPath('../node_modules/.bin/vue-cli-service');

fs.emptyDirSync(getPath('../packages'));
