import BaseProgressBar from './BaseProgressBar';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseProgressBar);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseProgressBar,
};
