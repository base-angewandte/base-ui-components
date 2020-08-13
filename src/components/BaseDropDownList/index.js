import BaseDropDownList from './BaseDropDownList';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDropDownList);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDropDownList,
};
