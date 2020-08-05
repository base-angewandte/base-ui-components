import BaseDetailBox from './BaseDetailBox';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDetailBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDetailBox,
};
