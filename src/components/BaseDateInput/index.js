import BaseDateInput from './BaseDateInput';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, BaseDateInput);
  },
};

use(Plugin);

export default Plugin;

export {
  BaseDateInput,
};
