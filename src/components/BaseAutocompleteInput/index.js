import { use, registerComponent } from '@/utils/plugins';
import BaseAutocompleteInput from './BaseAutocompleteInput';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseAutocompleteInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseAutocompleteInput,
};
