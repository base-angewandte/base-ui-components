import BaseMap from './BaseMap';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
