import BaseChipsInputField from './BaseChipsInputField';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChipsInputField);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChipsInputField,
};
