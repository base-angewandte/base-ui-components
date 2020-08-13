import BaseHoverBox from './BaseHoverBox';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseHoverBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseHoverBox,
};
