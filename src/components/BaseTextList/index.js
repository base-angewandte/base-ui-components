import { use, registerComponent } from '@/utils/plugins';
import BaseTextList from './BaseTextList';

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
