import { use, registerComponent } from '@/utils/plugins';
import BaseHlsVideo from './BaseHlsVideo';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseHlsVideo);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseHlsVideo,
};
