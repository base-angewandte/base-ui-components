import BaseResultBoxSection from './BaseResultBoxSection';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseResultBoxSection);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseResultBoxSection,
};
