import { use, registerComponent } from '@/utils/plugins';
import BaseChip from './BaseChip';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChip);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChip,
};
