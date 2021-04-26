import { use, registerComponent } from '@/utils/plugins';
import BaseEditControl from './BaseEditControl';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseEditControl);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseEditControl,
};
