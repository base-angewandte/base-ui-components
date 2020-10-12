import BaseIcon from './BaseIcon';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseIcon);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseIcon,
};
