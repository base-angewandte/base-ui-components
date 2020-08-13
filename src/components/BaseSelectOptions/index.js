import BaseSelectOptions from './BaseSelectOptions';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseSelectOptions);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseSelectOptions,
};
