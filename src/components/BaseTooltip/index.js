import { use, registerComponent } from '@/utils/plugins';
import BaseTooltip from './BaseTooltip';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseTooltip);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseTooltip,
};
