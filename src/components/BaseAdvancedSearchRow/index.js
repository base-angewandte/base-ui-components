import { use, registerComponent } from '@/utils/plugins';
import BaseAdvancedSearchRow from './BaseAdvancedSearchRow';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseAdvancedSearchRow);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseAdvancedSearchRow,
};
