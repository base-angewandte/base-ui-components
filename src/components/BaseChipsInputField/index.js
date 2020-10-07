import { use, registerComponent } from '@/utils/plugins';
import BaseChipsInputField from './BaseChipsInputField';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseChipsInputField);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseChipsInputField,
};
