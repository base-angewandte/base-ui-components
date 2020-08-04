import BaseImageBox from './BaseImageBox';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseImageBox)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseImageBox
};