import BaseBoxTooltip from './BaseBoxTooltip';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseBoxTooltip);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseBoxTooltip,
};
