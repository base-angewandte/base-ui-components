import { use, registerComponent } from '@/utils/plugins';
import BaseDropDown from './BaseDropDown';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDropDown);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDropDown,
};
