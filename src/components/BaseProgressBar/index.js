import BaseProgressBar from './BaseProgressBar';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
