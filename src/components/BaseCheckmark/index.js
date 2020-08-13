import BaseCheckmark from './BaseCheckmark';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseCheckmark);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseCheckmark,
};
