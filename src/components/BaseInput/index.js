import BaseInput from './BaseInput';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseInput,
};
