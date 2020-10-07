import { use, registerComponent } from '@/utils/plugins';
import BaseSelectOptions from './BaseSelectOptions';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseSelectOptions);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseSelectOptions,
};
