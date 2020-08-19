import { use, registerComponent } from '@/utils/plugins';
import BasePagination from './BasePagination';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BasePagination);
  },
};

use(Plugin);

export default Plugin;

export {
  BasePagination,
};
