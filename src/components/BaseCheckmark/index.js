import { use, registerComponent } from '@/utils/plugins';
import BaseCheckmark from './BaseCheckmark';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseCheckmark);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseCheckmark,
};
