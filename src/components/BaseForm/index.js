import { use, registerComponent } from '@/utils/plugins';
import BaseForm from './BaseForm';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseForm);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseForm,
};
