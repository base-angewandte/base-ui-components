import { use, registerComponent } from '@/utils/plugins';
import BaseBoxButton from './BaseBoxButton';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseBoxButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseBoxButton,
};
