import { use, registerComponent } from '@/utils/plugins';
import BaseDropBox from './BaseDropBox';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDropBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDropBox,
};
