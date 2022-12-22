/**
 * Collect css files, generate exports property, update package.json
 */

const fs = require('fs');
const path = require('path');

const config = {
  // path to package.json
  packageJson: path.join(__dirname, '../package.json'),
  // directory to collect files from
  src: path.join(__dirname, '../dist') ,
  // pattern to match files
  pattern: /\.css$/,
  // default object where the css exports are appended
  exports: {
    '.': {
      import: './dist/src/components/index.es.js',
      require: './dist/src/components/index.cjs.js'
    }
  }
}

/**
 * Walk through directories and collect file paths of matching files
 *
 * @param {String} dir - define directory to start search from
 * @param {RegExp} filter - define filter to match files
 * @param {Array} data
 * @returns {*[]} - array with file paths
 */
const getFilePaths = (dir, filter, data = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      getFilePaths(filePath, filter, data);
    } else if (filter.test(filePath)) {
      data.push(filePath);
    }
  });

  return data;
}

/**
 * Generate exports
 *
 * @param {Array} input - array with file paths
 * @param {Object} output - default object that will be extended
 * @returns {{}} - object with exports
 */
const generateExports = (input = [], output = {}) => {
  input.forEach(item => {
    // remove local file path
    const row = item.replace(path.join(__dirname, '../'), './');
    // append to output
    output[row] = row;
  });

  return output;
};

/**
 * Collect css files, generate exports property, update package.json
 */
const updatePackageJson = () => {
  try {
    // read package.json object
    const data = require(config.packageJson);

    // get css file path
    const cssFilePaths = getFilePaths(config.src, config.pattern)

    // generate and update exports
    data.exports = generateExports(cssFilePaths, config.exports);

    // format package.json and add a new line
    const formattedData = JSON.stringify(data, null, 2)  + '\r\n';

    // write updated package.json
    fs.writeFileSync(config.packageJson, formattedData,{ encoding:'utf8', flag:'w' });

    // inform user
    console.log(config.packageJson + ' updated');
  } catch(e) {
    // inform user
    console.log(config.packageJson + ' could not be updated:\n');
    console.log(e);
  }
};

updatePackageJson();
