import BaseButton from './BaseButton';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseButton,
};
