import BaseChipsInputField from './BaseChipsInputField';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
