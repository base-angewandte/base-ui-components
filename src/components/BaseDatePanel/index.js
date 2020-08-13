import BaseDatePanel from './BaseDatePanel';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDatePanel);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDatePanel,
};
