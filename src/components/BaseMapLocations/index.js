import { use, registerComponent } from '@/utils/plugins';
import BaseMapLocations from './BaseMapLocations';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMapLocations);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMapLocations,
};
