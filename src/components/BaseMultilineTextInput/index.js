import BaseMultilineTextInput from './BaseMultilineTextInput';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMultilineTextInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMultilineTextInput,
};
