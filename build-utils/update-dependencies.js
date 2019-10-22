const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../package');

const dependencies = Object.entries(packageJson.dependencies);

let fileData = fs.readFileSync(path.resolve(__dirname, '../lib.json'), { encoding: 'utf8' });

// update version
fileData = fileData.replace(/"version": ".*"/, `"version": "${packageJson.version}"`);

// go through dependencies
dependencies.forEach((dep) => {
  const re = new RegExp(`"${dep[0]}": ".*"`, 'g');
  fileData = fileData.replace(re, `"${dep[0]}": "${dep[1]}"`);
});

fs.writeFileSync(path.resolve(__dirname, '../lib.json'), fileData);

console.info('Dependencies updated!');
