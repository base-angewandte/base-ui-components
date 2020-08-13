import BaseUploadBar from './BaseUploadBar';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseUploadBar);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseUploadBar,
};
