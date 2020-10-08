import { use, registerComponent } from '@/utils/plugins';
import BaseChipsInput from './BaseChipsInput';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChipsInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChipsInput,
};
