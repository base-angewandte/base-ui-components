import BaseExpandRow from './BaseExpandRow';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseExpandRow);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseExpandRow,
};
