import BaseBox from './BaseBox';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseBox,
};
