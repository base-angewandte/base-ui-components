import BasePopUp from './BasePopUp';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BasePopUp)
    }
};

use(Plugin);

export default Plugin;

export {
    BasePopUp
};