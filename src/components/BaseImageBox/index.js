import BaseImageBox from './BaseImageBox';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseImageBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseImageBox,
};
