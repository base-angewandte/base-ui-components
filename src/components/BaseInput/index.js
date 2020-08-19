import { use, registerComponent } from '@/utils/plugins';
import BaseInput from './BaseInput';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseInput,
};
