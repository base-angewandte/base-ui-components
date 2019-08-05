/* eslint-disable no-console */
/* eslint-disable-next-line */
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const parseComponent = require('@vue/component-compiler-utils').parse;
const { execSync } = require('child_process');
const templateCompiler = require('vue-template-compiler');
const extract = require('extract-comments');
const doctrine = require('doctrine');
const libConfig = require('../lib');


function getPath(...args) {
  return path.resolve(__dirname, ...args);
}

function generatePackageJson(packageName) {
  const repoName = `${libConfig.author.github}/${libConfig.name}`;
  return JSON.stringify(
    {
      name: packageName.name,
      description: packageName.description,
    },
  );
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
    const destFolder = path.resolve(destPackageFolder, build.dest ? build.dest : buildTypeBase);

    console.log(destFolder);
    const newIndexPath = path.resolve(destFolder, `index${buildModifier ? '.' : ''}.js`);

    if (!fs.existsSync(destPackageFolder)) {
      fs.mkdirSync(destPackageFolder);
    }

    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder);
    }

    const oldMapPath = `${oldIndexPath}.map`;
    const newMapPath = `${newIndexPath}.map`;

    fs.renameSync(oldIndexPath, newIndexPath);
    fs.renameSync(oldMapPath, newMapPath);
    fs.writeFileSync(
      newIndexPath,
      fs
        .readFileSync(newIndexPath, { encoding: 'utf8' })
        .replace(path.basename(oldMapPath), path.basename(newMapPath)),
    );

    fs.copySync(getPath('../src'), path.resolve(destPackageFolder, 'scr'), {
      filter: filePath => !/\.unit\.js$/.test(filePath),
    });

    fs.writeFileSync(
      path.resolve(destPackageFolder, 'index.js'),
      `\
        export * from './src${componentName ? `/${componentName}.vue` : ''};
      `,
    );

    let description = libConfig.description;
    let example;
    if (componentName) {
      const srcFilePath = getPath(`../src/components/${componentName}/${componentName}.vue`);
      const result = parseComponent({
        source: fs.readFileSync(srcFilePath, { encoding: 'utf8' }),
        filename: srcFilePath,
        // eslint-disable-next-line import/no-extraneous-dependencies
        compiler: templateCompiler,
      });
      const script = extract(result.script.content).filter(comment => comment.type === 'BlockComment');
      description = script && script.length ? doctrine.parse(script[0].raw) : '';

      const packageConfig = {
        name: packageName,
        moduleName: componentName || _.upperFirst(_.camelCase(packageName)),
        description,
        example,
      };

      console.info(`Writing package.json for ${packageConfig.moduleName}`);
      fs.writeFileSync(
        path.resolve(destPackageFolder, 'package.json'),
        generatePackageJson(packageConf),
      );
    }


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
/*
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
*/

const testComp = [].concat(componentNames.slice(0, 1));
console.log(testComp);
// for each component in the src/components directory...
testComp.forEach((componentName) => {
  // Build the component individually
  console.info(`Building ${componentName}`);
  execSync(
    `${vueCliServicePath} build src/components/${componentName}/${componentName}.vue --target lib --name index --dest dist/${componentName}`,
  );

  // Rename the CommonJS build so that it can be imported with
  // $${libConfig/dist/componentName
  renameIndex(componentName);
});
