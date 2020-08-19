import { use, registerComponent } from '@/utils/plugins';
import BaseHoverBox from './BaseHoverBox';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseHoverBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseHoverBox,
};
