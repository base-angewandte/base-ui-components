import BaseAutocompleteInput from './BaseAutocompleteInput';

import { use, registerComponent } from '../../utils/plugins';

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
