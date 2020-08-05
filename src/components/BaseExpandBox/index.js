import BaseExpandBox from './BaseExpandBox';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandBox,
};
