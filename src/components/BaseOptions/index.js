import BaseOptions from './BaseOptions';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseOptions)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseOptions
};