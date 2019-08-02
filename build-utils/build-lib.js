/* eslint-disable no-console */
/* eslint-disable-next-line */
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const parseComponent = require('@vue/component-compiler-utils').parse;
const { execSync } = require('child_process');
const libConfig = require('../lib');


function getPath(...args) {
  return path.resolve(__dirname, ...args);
}

function renameIndex(componentName) {
  const builds = [
    {
      type: 'common',
      dest: 'cjs',
    },
    {
      type: 'umd',
    },
    {
      type: 'umd.min',
    },
  ];

  const packageName = _.compact([
    libConfig.name,
    _.kebabCase(componentName),
  ]).join('.');

  const destPackageFolder = getPath(`../packages/${packageName}`);

  builds.forEach((build) => {
    const oldIndexPath = getPath(`../dist/${componentName || ''}/index.${build.type}.js`);
    const [buildTypeBase, buildModifier] = build.type.split('.');
    const destFolder = path.resolve(destPackageFolder, build.dest ? build.test : buildTypeBase);

    console.log(destFolder);
    const newIndexPath = path.resolve(destFolder, `index${buildModifier ? '.' : ''}.js`);

    if (!fs.existsSync(destPackageFolder)) {
      fs.mkdirSync(destPackageFolder);
    }

    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder);
    }

    const oldMapPath = oldIndexPath + '.map';
    const newMapPath = `${newIndexPath}.map`;

    fs.renameSync(oldIndexPath, newIndexPath);
    fs.renameSync(oldMapPath, newMapPath);
    fs.writeFileSync(
      newIndexPath,
      fs.readFileSync(newIndexPath, { endcoding: 'utf8' })
        .replace(path.basename(oldMapPath), path.basename(newMapPath)),
    );


  });
}

console.info('Lets build!');

// Update the index file
console.info('Updating index file');
require('./update-index-file');

// Get the names of all components in the src directory
const componentNames = require('./component-names');

// Get the binary for vue-cli-service
const vueCliServicePath = getPath('../node_modules/.bin/vue-cli-service');

fs.emptyDirSync(getPath('../packages'));

// build main library
console.info('Building main library');
execSync(
  `${vueCliServicePath} build src/index.js --target lib --name index --dest dist/`,
  { stdio: 'inherit' },
);
console.info('library built!');

// Rename the CommonJS build so that it can be imported with
// ${libConfig}/dist
renameIndex();



