const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const minimist = require('minimist');

const { force } = minimist(process.argv.slice(2));

const generate = () => {
  console.info('Generating index file');
  // from buefy - define base folder and components folder
  const baseFolder = './src/';
  const componentsFolder = 'components/';

// from buefy - get all component names directly from components folder
  const components = fs
    .readdirSync(baseFolder + componentsFolder)
    .filter(f => fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory());

  components.forEach((component) => {
    const indexFilePath = path.resolve(`${baseFolder}${componentsFolder}${component}`, 'index.js');
    // check if index file exists already
    if (force || !fs.existsSync(indexFilePath)) {
      console.info(`index.js generated for ${component}`);
      fs.writeFileSync(
        indexFilePath,
        `import { use, registerComponent } from '@/utils/plugins';
import ${component} from './${component}';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, ${component});
  },
};

use(Plugin);

export default Plugin;

export {
  ${component},
};
`,
      );
    }
  });
}
generate();

module.exports = generate;
