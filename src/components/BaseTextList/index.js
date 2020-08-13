import BaseTextList from './BaseTextList';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseTextList);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseTextList,
};
