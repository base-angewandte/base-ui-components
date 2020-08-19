import { use, registerComponent } from '@/utils/plugins';
import BaseExpandBox from './BaseExpandBox';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandBox,
};
