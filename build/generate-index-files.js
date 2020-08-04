const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

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
  if (!fs.existsSync(indexFilePath)) {
    fs.writeFileSync(
      indexFilePath,
      `import ${component} from './${component}';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
