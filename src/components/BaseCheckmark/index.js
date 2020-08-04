import BaseCheckmark from './BaseCheckmark';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseCheckmark)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseCheckmark
};