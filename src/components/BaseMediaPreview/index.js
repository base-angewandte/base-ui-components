import { use, registerComponent } from '@/utils/plugins';
import BaseMediaPreview from './BaseMediaPreview';

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
