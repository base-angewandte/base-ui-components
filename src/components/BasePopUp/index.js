import { use, registerComponent } from '@/utils/plugins';
import BasePopUp from './BasePopUp';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BasePopUp);
  },
};

use(Plugin);

export default Plugin;

export {
  BasePopUp,
};
