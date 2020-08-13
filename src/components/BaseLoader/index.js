import BaseLoader from './BaseLoader';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseLoader);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseLoader,
};
