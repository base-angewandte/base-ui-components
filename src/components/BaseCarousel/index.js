import BaseCarousel from './BaseCarousel';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseCarousel);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseCarousel,
};
