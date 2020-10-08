import { use, registerComponent } from '@/utils/plugins';
import BaseMenuList from './BaseMenuList';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMenuList);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMenuList,
};
