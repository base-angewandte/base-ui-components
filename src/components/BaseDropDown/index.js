import BaseDropDown from './BaseDropDown';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseDropDown)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseDropDown
};