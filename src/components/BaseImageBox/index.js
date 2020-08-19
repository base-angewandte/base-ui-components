import { use, registerComponent } from '@/utils/plugins';
import BaseImageBox from './BaseImageBox';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseImageBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseImageBox,
};
