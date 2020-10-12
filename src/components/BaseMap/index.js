import { use, registerComponent } from '@/utils/plugins';
import BaseMap from './BaseMap';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMap);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMap,
};
