import BaseInput from './BaseInput';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseInput,
};
