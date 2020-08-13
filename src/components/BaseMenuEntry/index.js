import BaseMenuEntry from './BaseMenuEntry';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMenuEntry);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMenuEntry,
};
