import BaseSearch from './BaseSearch';

import { use, registerComponent } from '../../utils/plugins';

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
