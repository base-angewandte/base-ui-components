import { use, registerComponent } from '@/utils/plugins';
import BaseMediaCarousel from './BaseMediaCarousel';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMediaCarousel);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMediaCarousel,
};
