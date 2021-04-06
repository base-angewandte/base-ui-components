import { use, registerComponent } from '@/utils/plugins';
import BaseAdvancedSearch from './BaseAdvancedSearch';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseAdvancedSearch);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseAdvancedSearch,
};
