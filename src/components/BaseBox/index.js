import { use, registerComponent } from '@/utils/plugins';
import BaseBox from './BaseBox';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseBox,
};
