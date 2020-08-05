import BaseChip from './BaseChip';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChip);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChip,
};
