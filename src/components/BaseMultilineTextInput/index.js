import { use, registerComponent } from '@/utils/plugins';
import BaseMultilineTextInput from './BaseMultilineTextInput';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseMultilineTextInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseMultilineTextInput,
};
