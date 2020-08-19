import { use, registerComponent } from '@/utils/plugins';
import BaseToggle from './BaseToggle';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseToggle);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseToggle,
};
