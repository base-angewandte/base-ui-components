import BaseBoxButton from './BaseBoxButton';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseBoxButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseBoxButton,
};
