import BaseOptions from './BaseOptions';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseOptions);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseOptions,
};
