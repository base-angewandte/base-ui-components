import BaseMenuEntry from './BaseMenuEntry';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMenuEntry);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMenuEntry,
};
