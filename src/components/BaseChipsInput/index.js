import BaseChipsInput from './BaseChipsInput';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseChipsInput)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseChipsInput
};