import { use, registerComponent } from '@/utils/plugins';
import BaseImage from './BaseImage';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseImage);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseImage,
};
