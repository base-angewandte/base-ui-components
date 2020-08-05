import BaseAutocompleteInput from './BaseAutocompleteInput';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
