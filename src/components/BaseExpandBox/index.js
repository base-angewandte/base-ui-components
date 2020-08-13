import BaseExpandBox from './BaseExpandBox';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandBox,
};
