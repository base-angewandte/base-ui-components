import BaseChipsInput from './BaseChipsInput';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChipsInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChipsInput,
};
