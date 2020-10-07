const path = require('path');
const fs = require('fs');
let fileMapping = {};

const updateSvgIconFiles = () => {
  const directoryPath = path.join(__dirname, '../src/assets/icons');

  fs.readdir(directoryPath, function (err, files) {

    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    // Add export line to each svg icon file
    files
      .filter((file) => file !== 'index.js'
        && path.parse(file).ext === '.js')
      .forEach((file) => {
        const fileName = path.parse(file).name;
        const append = `\nexport default '${camelizeString(fileName)}';\n`;

        fs.appendFile(directoryPath + '/' + file, append, (err) => {
          if (err) throw err;
        });

        fileMapping[fileName] = camelizeString(fileName);

        console.log('Added export to: ' + file);
      });

    // Update index file with imports and exports
    let indexFileContent = '';

    Object.keys(fileMapping)
      .forEach((key) => {
        indexFileContent += `import ${fileMapping[key]} from './${key}';\n`;
      });

    indexFileContent += '\n';
    indexFileContent += 'export default {\n';
    Object.keys(fileMapping)
      .forEach((key) => {
        indexFileContent += `  ${fileMapping[key]},\n`;
      });
    indexFileContent += '};\n';

    let buffer = new Buffer.from(indexFileContent);

    fs.open(directoryPath + '/index.js', 'w', function (err, fd) {
      if (err) {
        throw 'Could not open file: ' + err;
      }

      fs.write(fd, buffer, 0, buffer.length, null, function (err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function () {
          console.log('Updated import/export: index.js');
          console.log('\nDone!');
        });
      });
    });
  });
};

const camelizeString = (string) => {
  string = string.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

updateSvgIconFiles();

module.exports = updateSvgIconFiles;
