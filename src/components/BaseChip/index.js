import BaseChip from './BaseChip';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChip);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChip,
};
