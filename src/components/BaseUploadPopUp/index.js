import { use, registerComponent } from '@/utils/plugins';
import BaseUploadPopUp from './BaseUploadPopUp';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseUploadPopUp);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseUploadPopUp,
};
