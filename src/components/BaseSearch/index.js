import { use, registerComponent } from '@/utils/plugins';
import BaseSearch from './BaseSearch';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseSearch);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseSearch,
};
