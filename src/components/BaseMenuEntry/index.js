import { use, registerComponent } from '@/utils/plugins';
import BaseMenuEntry from './BaseMenuEntry';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMenuEntry);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMenuEntry,
};
