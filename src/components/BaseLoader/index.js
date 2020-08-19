import { use, registerComponent } from '@/utils/plugins';
import BaseLoader from './BaseLoader';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseLoader);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseLoader,
};
