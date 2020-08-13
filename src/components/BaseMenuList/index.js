import BaseMenuList from './BaseMenuList';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMenuList);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMenuList,
};
