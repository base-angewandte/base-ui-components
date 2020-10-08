import { use, registerComponent } from '@/utils/plugins';
import BaseDetailBox from './BaseDetailBox';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDetailBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDetailBox,
};
