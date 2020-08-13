import BaseDropBox from './BaseDropBox';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDropBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDropBox,
};
