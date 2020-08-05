import BaseSearch from './BaseSearch';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
