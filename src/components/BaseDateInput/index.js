import { use, registerComponent } from '@/utils/plugins';
import BaseDateInput from './BaseDateInput';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDateInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDateInput,
};
