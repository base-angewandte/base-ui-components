import BaseBoxButton from './BaseBoxButton';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseBoxButton)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseBoxButton
};