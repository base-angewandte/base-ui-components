import BasePopUp from './BasePopUp';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BasePopUp);
  },
};

use(Plugin);

export default Plugin;

export {
  BasePopUp,
};
