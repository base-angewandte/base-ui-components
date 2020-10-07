import { use, registerComponent } from '@/utils/plugins';
import BaseBoxTooltip from './BaseBoxTooltip';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseBoxTooltip);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseBoxTooltip,
};
