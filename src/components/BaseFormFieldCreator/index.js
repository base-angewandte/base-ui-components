import { use, registerComponent } from '@/utils/plugins';
import BaseFormFieldCreator from './BaseFormFieldCreator';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseFormFieldCreator);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseFormFieldCreator,
};
