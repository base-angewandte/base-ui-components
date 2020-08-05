import BaseMenuList from './BaseMenuList';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
