import { use, registerComponent } from '@/utils/plugins';
import BaseResultBoxSection from './BaseResultBoxSection';

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
