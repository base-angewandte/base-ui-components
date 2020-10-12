import { use, registerComponent } from '@/utils/plugins';
import BaseDatePanel from './BaseDatePanel';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDatePanel);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDatePanel,
};
