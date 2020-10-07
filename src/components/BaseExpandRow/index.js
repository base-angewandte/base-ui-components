import { use, registerComponent } from '@/utils/plugins';
import BaseExpandRow from './BaseExpandRow';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandRow);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandRow,
};
