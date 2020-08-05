import BaseHoverBox from './BaseHoverBox';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseHoverBox);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseHoverBox,
};
