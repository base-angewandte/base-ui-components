import { use, registerComponent } from '@/utils/plugins';
import BaseExpandList from './BaseExpandList';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandList);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandList,
};
