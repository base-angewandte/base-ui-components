import { use, registerComponent } from '@/utils/plugins';
import BaseFormGroups from './BaseFormGroups';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseFormGroups);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseFormGroups,
};
