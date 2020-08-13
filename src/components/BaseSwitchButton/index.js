import BaseSwitchButton from './BaseSwitchButton';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseSwitchButton);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseSwitchButton,
};
