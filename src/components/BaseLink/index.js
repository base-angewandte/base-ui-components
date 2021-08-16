import { use, registerComponent } from '@/utils/plugins';
import BaseLink from './BaseLink';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseLink);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseLink,
};
