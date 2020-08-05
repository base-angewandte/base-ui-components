import BaseChipsBelow from './BaseChipsBelow';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChipsBelow);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChipsBelow,
};
