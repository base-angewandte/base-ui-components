import { use, registerComponent } from '@/utils/plugins';
import BaseOptions from './BaseOptions';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseOptions);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseOptions,
};
