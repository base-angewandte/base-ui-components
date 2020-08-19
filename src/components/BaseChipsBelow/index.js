import { use, registerComponent } from '@/utils/plugins';
import BaseChipsBelow from './BaseChipsBelow';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChipsBelow);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChipsBelow,
};
