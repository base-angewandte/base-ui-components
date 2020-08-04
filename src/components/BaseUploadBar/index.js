import BaseUploadBar from './BaseUploadBar';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseUploadBar)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseUploadBar
};