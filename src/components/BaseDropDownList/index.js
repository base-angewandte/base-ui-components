import BaseDropDownList from './BaseDropDownList';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseDropDownList)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseDropDownList
};