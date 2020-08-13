import BasePagination from './BasePagination';

import { use, registerComponent } from '../../utils/plugins';

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
