import { use, registerComponent } from '@/utils/plugins';
import BaseDropDownList from './BaseDropDownList';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDropDownList);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDropDownList,
};
