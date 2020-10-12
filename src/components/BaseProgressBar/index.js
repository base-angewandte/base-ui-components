import { use, registerComponent } from '@/utils/plugins';
import BaseProgressBar from './BaseProgressBar';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseProgressBar);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseProgressBar,
};
