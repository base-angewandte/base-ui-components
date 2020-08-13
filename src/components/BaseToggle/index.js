import BaseToggle from './BaseToggle';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseToggle);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseToggle,
};
