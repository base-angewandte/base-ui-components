import BaseSwitchButton from './BaseSwitchButton';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

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
