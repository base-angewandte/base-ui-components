import { use, registerComponent } from '@/utils/plugins';
import BaseDropButton from './BaseDropButton';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDropButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDropButton,
};
