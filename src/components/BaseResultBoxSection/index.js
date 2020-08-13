import BaseResultBoxSection from './BaseResultBoxSection';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseResultBoxSection);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseResultBoxSection,
};
