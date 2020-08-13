import BaseExpandRow from './BaseExpandRow';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandRow);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandRow,
};
