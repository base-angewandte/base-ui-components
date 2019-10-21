/* eslint-disable no-console */
/* eslint-disable-next-line */
const fs = require('fs-extra');
const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash');
const parseComponent = require('@vue/component-compiler-utils').parse;
const { execSync } = require('child_process');
const templateCompiler = require('vue-template-compiler');
const extract = require('extract-comments');
const doctrine = require('doctrine');
const libConfig = require('../lib');

console.info('Lets build!');

// Update the index file
console.info('Updating index file');
require('./update-index-file');

// Get the names of all components in the src directory
const componentNames = require('./component-names');


function getPath(...args) {
  return path.resolve(__dirname, ...args);
}

function generatePackageJson(packageName) {
  const repoName = `${libConfig.author.github}/${libConfig.name}`;
  return JSON.stringify(
    {
      name: packageName.name,
      description: packageName.description,
      version: libConfig.version,
      author: libConfig.author,
      license: 'SEE LICENSE IN LICENSE.md',
      homepage: `https://www.npmjs.com/package/${packageName.name}`,
      repository: {
        type: 'git',
        url: `git+https://github.com/${repoName}.git`,
      },
      bugs: {
        url: `https://github.com/${repoName}/issues`,
      },
      module: 'umd/index.js',
      main: 'cjs/index.js',
      unpkg: 'umd/index.min.js',
      jsdelivr: 'umd/index.min.js',
      peerDependencies: libConfig.peerDependencies,
      dependencies: libConfig.dependencies,
    },
    null,
    2,
  );
}

function generateReadme(pack) {
  if (!pack.example) {
    return `
# ${pack.name}

> ${pack.description}

## Installation

### Directly in the browser

Drop the library in with a \`<script\` tag alongside Vue:

\`\`\`html
<div id="app">
    <!-- ... use components here -->
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/${pack.name}"></script>
<script>
    new Vue({ el: '#app' })
</script>
\`\`\`

Or, if you only want to use a small subset of components, drop them in individually

\`\`\`html
<div id="app">
  <!-- ... use component here ... -->
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/${pack.name}/HelloA"></script>
<script>
  new Vue({ el: '#app' })
</script>
\`\`\`

### In a module system

Install the library with NPM

\`\`\`bash
npm install ${pack.name}
\`\`\`
Then either import the library and either globally register all components with:
\`\`\`js
import ${pack.moduleName} from '${pack.name}'
Vue.use(${pack.moduleName})
\`\`\`
or import and locally register a single component with:
\`\`\`js
import { HelloA } from '${pack.name}'
export default {
    components: { ${pack.moduleName} }
}
\`\`\`
#### Individually packaged components
If you only want to use a small subset of components, import only individually packaged components to reduce the size of your application:
\`\`\`js
import HelloA from 'hello-vue-components/HelloA'
import HelloB from 'hello-vue-components/HelloB'
\`\`\`
    `;
  }
  return `\
# ${pack.name}
> ${pack.description}
## Installation
### Directly in the browser
Drop the component in with a \`<script>\` tag alongside Vue:
\`\`\`html
<div id="app">
<!-- ... use component here ... -->
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/${pack.name}"></script>
<script>
new Vue({ el: '#app' })
</script>
\`\`\`
### In a module system
Install the component with NPM:
\`\`\`bash
npm install ${pack.name}
\`\`\`
Then import the component:
\`\`\`js
import ${pack.moduleName} from '${pack.name}'
\`\`\`
And either globally register it for use in all components:
\`\`\`js
Vue.component(${pack.moduleName}, '${pack.name}')
\`\`\`
or locally register it for use in an individual component:
\`\`\`js
export default {
components: { ${pack.moduleName} }
}
\`\`\`
## Usage
\`\`\`html
${pack.example}
\`\`\`
`;
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
    const oldIndexPath = getPath(`../dist/lib/${componentName || ''}/${componentName ? 'index' : 'base-ui-components'}.${build.type}.js`);
    const [buildTypeBase, buildModifier] = build.type.split('.');
    const destFolder = path.resolve(destPackageFolder, build.dest ? build.dest : buildTypeBase);

    const newIndexPath = path.resolve(
      destFolder,
      `index${buildModifier ? `.${buildModifier}` : ''}.js`,
    );

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
  });

  fs.copySync(getPath('../src'), path.resolve(destPackageFolder, 'src'), {
    filter: filePath => !/\.unit\.js$/.test(filePath),
  });

  // for main library export everything
  let exportStatement = `export * from './src';
export { default } from './src';`;

  // if this is for component use export default
  if (componentName) {
    exportStatement = `\
import ${componentName} from './src/components/${componentName}/${componentName}.vue';

export default ${componentName};
`;
  }
  fs.writeFileSync(
    path.resolve(destPackageFolder, 'index.js'),
    exportStatement,
  );

  // get main library description
  let { description } = libConfig;
  let example;
  // if component, extract description from component documentation
  if (componentName) {
    const srcFilePath = getPath(`../src/components/${componentName}/${componentName}.vue`);
    const result = parseComponent({
      source: fs.readFileSync(srcFilePath, { encoding: 'utf8' }),
      filename: srcFilePath,
      // eslint-disable-next-line import/no-extraneous-dependencies
      compiler: templateCompiler,
    });
    const script = extract(result.script.content).filter(comment => comment.type === 'BlockComment');
    description = script && script.length ? doctrine.parse(script[0].raw).description.replace('\n', '') : '';
  }
  const packageConfig = {
    name: packageName,
    moduleName: componentName || _.upperFirst(_.camelCase(packageName)),
    description,
    example,
  };

  console.info(`Writing package.json for ${packageConfig.moduleName}`);
  fs.writeFileSync(
    path.resolve(destPackageFolder, 'package.json'),
    generatePackageJson(packageConfig),
  );
  console.info(`Writing readme file for ${packageConfig.moduleName}`);
  fs.writeFileSync(
    path.resolve(destPackageFolder, 'README.md'),
    generateReadme(packageConfig),
  );
  console.info(`Adding license for ${packageConfig.moduleName}`);
  const licenseStr = fs.readFileSync(path.resolve('', 'LICENSE.md')).toString('utf8');
  fs.writeFileSync(
    path.resolve(destPackageFolder, 'LICENSE.md'),
    licenseStr,
  );

  if (componentName) {
    const componentPackageFolder = path.resolve(
      __dirname,
      `../packages/${libConfig.name}/${componentName}`,
    );
    fs.copySync(destPackageFolder, componentPackageFolder, {
      filter: filePath => !/(LICENSE|README\.md|src)$/.test(filePath),
    });

    const exportStatement2 = componentName ? `\
import ${componentName} from '../src/components/${componentName}/${componentName}.vue';

export default ${componentName};
` : 'export * from \'../src\';';

    fs.writeFileSync(
      path.resolve(componentPackageFolder, 'index.js'),
      exportStatement2,
    );
  }
}

// Get the binary for vue-cli-service
const vueCliServicePath = getPath('../node_modules/.bin/vue-cli-service');

fs.emptyDirSync(getPath('../packages'));

// build main library
console.info('Building main library');
execSync(
  `${vueCliServicePath} build src/index.js --target lib --name base-ui-components --dest dist/lib`,
  { stdio: 'inherit' },
);
console.info('library built!');

// Rename the CommonJS build so that it can be imported with
// ${libConfig}/dist
renameIndex();

// for each component in the src/components directory...
componentNames.forEach((componentName) => {
  // Build the component individually
  console.info(`Building ${componentName}`);
  execSync(
    `${vueCliServicePath} build src/components/${componentName}/${componentName}.vue \
    --target lib --name index --dest dist/lib/${componentName}`,
    { stdio: 'inherit' },
  );

  // Rename the CommonJS build so that it can be imported with
  // $${libConfig/dist/componentName
  renameIndex(componentName);
});
