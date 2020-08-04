import BaseDropBox from './BaseDropBox';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseDropBox)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseDropBox
};