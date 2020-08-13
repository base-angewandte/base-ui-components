import BaseForm from './BaseForm';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseForm);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseForm,
};
