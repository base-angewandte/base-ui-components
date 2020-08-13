import BaseButton from './BaseButton';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseButton,
};
