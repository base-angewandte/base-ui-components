import { use, registerComponent } from '@/utils/plugins';
import BaseSwitchButton from './BaseSwitchButton';

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
