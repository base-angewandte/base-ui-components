import { use, registerComponent } from '@/utils/plugins';
import BaseButton from './BaseButton';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseButton,
};
