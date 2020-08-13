import BaseMap from './BaseMap';

import { use, registerComponent } from '../../utils/plugins';

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
