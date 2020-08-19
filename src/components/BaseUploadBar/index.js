import { use, registerComponent } from '@/utils/plugins';
import BaseUploadBar from './BaseUploadBar';

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
