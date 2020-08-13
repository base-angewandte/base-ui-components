import BaseMediaPreview from './BaseMediaPreview';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMediaPreview);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMediaPreview,
};
