import { use, registerComponent } from '@/utils/plugins';
import BaseEntrySelector from './BaseEntrySelector';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseEntrySelector);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseEntrySelector,
};
