import BaseFormFieldCreator from './BaseFormFieldCreator';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseFormFieldCreator);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseFormFieldCreator,
};
