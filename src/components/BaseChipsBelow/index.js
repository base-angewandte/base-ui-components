import BaseChipsBelow from './BaseChipsBelow';

import { use, registerComponent } from '../../utils/plugins';

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
