const fs = require('fs');
const path = require('path');

// get all the .vue files in the src/components directory
const componentFileNames = fs
  .readdirSync(path.resolve(__dirname, '../src/components/'))
  .reduce((prev, componentDirectory) => prev.concat(fs
    .readdirSync(path.resolve(__dirname, `../src/components/${componentDirectory}`))), [])
  .filter(componentFileName => /\.vue$/.test(componentFileName));

// get the names of the components from the file names
module.exports = componentFileNames
  .map(componentFileName => componentFileName.replace(/\.\w+$/, ''));
