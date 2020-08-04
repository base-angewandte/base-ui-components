import BaseCarousel from './BaseCarousel';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseCarousel)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseCarousel
};