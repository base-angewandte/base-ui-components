import { use, registerComponent } from '@/utils/plugins';
import BaseCarousel from './BaseCarousel';

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
